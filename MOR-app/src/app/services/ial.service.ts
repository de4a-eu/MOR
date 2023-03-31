/*
 * Copyright (C) 2023, Partners of the EU funded DE4A project consortium
 * (https://www.de4a.eu/consortium), under Grant Agreement No.870635
 * Author: Dejan Lavbič (www.lavbic.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CanonicalEvidenceType } from "../classes/canonical-evidence-type";
import { DataLoaderService } from "./data-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IalService {
  constructor(
    private dataLoader: DataLoaderService,
    public translate: TranslateService,
    private http: HttpClient
  ) {}

  /**
   * Canonical evidence types defined by input parameters
   */
  public canonicalEvidenceTypes: string[] = [];

  /**
   * By request (provision) or upload
   * e.g. `{ BirthEvidence: "request", DeathEvidence: "upload" }`
   */
  public retrievalType: any = {};

  /**
   * Provisions
   */
  public provisions: any = {};

  /**
   * Content of uploaded files
   */
  public uploads: any = {};

  public canonicalEvidenceCountries: any = {};

  /**
   * Toggle retrieval type for given canonical evidence type
   * @param canonicalEvidenceType { string } `tokenName` of canonical
   * evidence type
   * @param type { string } retrieval type (`request` or `upload`)
   */
  public toggleRetrievalType(
    canonicalEvidenceType: string,
    type: string
  ): void {
    this.retrievalType[canonicalEvidenceType] = type;
    delete this.canonicalEvidenceCountries[canonicalEvidenceType];
    delete this.dataLoader.countryCode[canonicalEvidenceType];
    delete this.provisions[canonicalEvidenceType];
    delete this.uploads[canonicalEvidenceType];
  }

  /**
   * This function calls the IAL API with the given parameters and
   * returns the HTTP code of the response.
   * The response text is stored in the variable "ialProvisions" or
   * null if an error is returned
   * @value {string} urlApi : a mandatory string with the final URL
   * of the request
   * @return {int} : HTTP status code of the return; "200" is representing
   * a suscessful call. "404" when the search has not found results.
   */
  public retrieveIALProvisions(urlApi: string): Observable<any> {
    return this.http
      .get(urlApi, {
        headers: new HttpHeaders({
          Accept: "application/json; charset=utf-8",
        }),
      })
      .pipe(retry(1));
  }

  /**
   * Get a list of possible provision per selected canonical evidence type
   * (displayed to a user in a modal window)
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @returns array of provisions
   */
  public getProvisions(canonicalEvidenceType: string): any[] {
    let provision = this.provisions[canonicalEvidenceType];
    if (!provision) {
      return [];
    } else if (typeof provision == "string" && provision == "not available") {
      return [];
    } else if (typeof provision == "object") {
      return provision;
    } else {
      return [];
    }
  }

  /**
   * When multiple provisions are returned, user selects 1
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @param iProvision sequence number of selected provision
   */
  public selectProvision(
    canonicalEvidenceType: string,
    iProvision: number
  ): void {
    for (let i = 0; i < this.provisions[canonicalEvidenceType].length; i++)
      this.provisions[canonicalEvidenceType][i].selected = i == iProvision;
  }

  /**
   * When all countries of canonical evidences are selected,
   * including the provisions or upload is selected
   *
   * @returns true if use can proceed with explicit request
   */
  public canProceedWithExplicitRequest(): boolean {
    let nAll = Object.keys(this.retrievalType).length;
    let nOK = 0;
    Object.keys(this.retrievalType).map((type) => {
      if (this.retrievalType[type] == "upload") {
        if (this.uploads[type]) nOK++;
      } else if (this.retrievalType[type] == "request") {
        if (this.provisions[type]) {
          let ps = this.provisions[type];
          if (ps) {
            if (ps.length == 1) nOK++;
            else if (typeof ps == "object" && ps.length > 1) {
              ps.map((p: any) => {
                if (p.selected) nOK++;
              });
            }
          }
        }
      }
    });
    return nOK == nAll;
  }

  public displayProvision(canonicalEvidenceType: string): any {
    let provision = this.provisions[canonicalEvidenceType];
    if (!provision) {
      return null;
    } else if (typeof provision == "string" && provision == "not available") {
      return this.translate.instant(
        "GUI/provisionNotAvailable." +
          this.dataLoader.selectedLanguage +
          ".label"
      );
    } else if (typeof provision == "object") {
      if (provision.length > 1) {
        for (let i = 0; i < provision.length; i++) {
          if (provision[i].selected) return provision[i].dataOwnerPrefLabel;
        }
        return this.translate.instant(
          "GUI/select1Provision." + this.dataLoader.selectedLanguage + ".label"
        );
      } else {
        return provision[0].dataOwnerPrefLabel;
      }
    }
  }

  /**
   * Get evidence types that are included in explicit request
   * (user has selected country and provision)
   *
   * @returns array of canonical evidence types with `name`, `code` and
   *          `tokenName` that are included in the explicit request
   */
  public getEvidenceTypesForRequest(): CanonicalEvidenceType[] {
    return this.dataLoader
      .getSelectedCanonicalEvidenceTypes(this.canonicalEvidenceTypes)
      .filter((evidenceType) => {
        let retrievalType = this.retrievalType[evidenceType.tokenName || ""];
        let provision = this.provisions[evidenceType.tokenName || ""];
        return retrievalType == "request" && typeof provision == "object";
      });
  }

  /**
   * Get evidence types that are uploaded by the user
   *
   * @returns array of canonical evidence types with `name`, `code` and
   *          `tokenName` that are uploaded
   */
  public getEvidenceTypesForUpload(
    selectedEvidenceType: string
  ): CanonicalEvidenceType[] {
    return this.dataLoader
      .getSelectedCanonicalEvidenceTypes(this.canonicalEvidenceTypes)
      .filter((evidenceType) => {
        let retrievalType = this.retrievalType[evidenceType.tokenName || ""];
        let upload = this.uploads[evidenceType.tokenName || ""];
        return retrievalType == "upload" && typeof upload == "string";
      });
  }

  public getEvidenceTypeNameForPreview(selectedEvidenceType: string): string {
    let selectedEvidence = this.dataLoader
      .getSelectedCanonicalEvidenceTypes(this.canonicalEvidenceTypes)
      .find((x) => x.tokenName == selectedEvidenceType);
    if (selectedEvidence && selectedEvidence.morID)
      return this.translate.instant(
        selectedEvidence.morID +
          "." +
          this.dataLoader.selectedLanguage +
          ".label"
      );
    else return "";
  }
}
