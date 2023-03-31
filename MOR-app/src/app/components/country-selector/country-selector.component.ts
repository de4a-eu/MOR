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
import { Component, Input, OnInit } from "@angular/core";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { IalService } from "src/app/services/ial.service";
import { URL } from "../../classes/settings";

@Component({
  selector: "de4a-country-selector",
  templateUrl: "./country-selector.component.html",
})
export class CountrySelectorComponent implements OnInit {
  @Input("canonicalEvidenceType") canonicalEvidenceType!: string;
  constructor(public dataLoader: DataLoaderService, public ial: IalService) {}

  public flagURL?: string;

  public selectCountry(
    canonicalEvidenceType: string,
    countryCode: string
  ): void {
    this.dataLoader.setCountry(canonicalEvidenceType, countryCode);
    this.ial.canonicalEvidenceCountries[canonicalEvidenceType] = countryCode;
    delete this.ial.provisions[canonicalEvidenceType];
  }

  ngOnInit(): void {
    this.flagURL = URL.flags;
  }
}
