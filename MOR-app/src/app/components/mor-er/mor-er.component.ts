import { Component, OnInit, Input, Output } from '@angular/core';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import { DataLoaderCanonicalEvidenceTypesService } from 'src/app/services/data-loader-canonical-evidence-types.service';
import { DataLoaderIalService } from 'src/app/services/data-loader-ial.service';
import {
  faFileCode,
  faSignInAlt,
  faCheckCircle,
  faTimesCircle,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DataLoaderCountriesService } from 'src/app/services/data-loader-countries.service';

declare var bootstrap: any;

@Component({
  selector: 'app-mor-er',
  templateUrl: './mor-er.component.html',
  styleUrls: ['./mor-er.component.css'],
})
export class MORERComponent implements OnInit {
  faFileCode = faFileCode;
  faSignInAlt = faSignInAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faSyncAlt = faSyncAlt;

  @Input('defaultLang') defaultLanguage!: string;
  public selectedLanguage!: string;
  @Input('requesterCountryCode') requesterCountry!: string;
  @Input('canonicalEvidenceTypes') canonicalEvidenceTypes!: string;
  @Input('outputJSArrayId') outputJSArrayId!: string;

  constructor(
    private dataLoaderCanonicalEvidenceTypes: DataLoaderCanonicalEvidenceTypesService,
    public dataLoaderCountries: DataLoaderCountriesService,
    private dataLoaderIal: DataLoaderIalService
  ) {}

  public canonicalEvidenceCountries: any = {};
  public retrievalType: any = {}; // By request (provision) or upload
  public provisions: any = {}; // Provisions
  public uploads: any = {}; // Content of uploaded files

  public canonicalEvidenceCountriesSelected(): boolean {
    return (
      this.getEvidenceTypes().length ==
      Object.keys(this.canonicalEvidenceCountries).length
    );
  }

  public getEvidenceTypes(): CanonicalEvidenceType[] {
    return this.dataLoaderCanonicalEvidenceTypes.getSelectedCanonicalEvidenceTypes(
      this.canonicalEvidenceTypes
    );
  }

  public getEvidenceTypesForRequest(): CanonicalEvidenceType[] {
    return this.getEvidenceTypes().filter(
      (evidenceType) => {
        let retrievalType = this.retrievalType[evidenceType.tokenName || ''];
        let provision = this.provisions[evidenceType.tokenName || ''];
        return retrievalType == "request" && typeof provision == "object";
      }
    );
  }

  public getIalIP(canonicalEvidenceTypeId: string, countryCode: string): any {
    let result = this.dataLoaderIal.getIal(
      canonicalEvidenceTypeId,
      countryCode,
      'IP'
    );
    return result;
  }

  public requestProvision(canonicalEvidenceType: string): void {
    let country = this.canonicalEvidenceCountries[canonicalEvidenceType];
    let provisions = this.getIalIP(canonicalEvidenceType, country);
    if (provisions == null) provisions = 'not available';
    this.provisions[canonicalEvidenceType] = provisions;
  }

  public requestProvisions(): void {
    for (let canonicalEvidenceType in this.canonicalEvidenceCountries) {
      this.requestProvision(canonicalEvidenceType);
    }
  }

  public getProvision(canonicalEvidenceType: string): any {
    let provision = this.provisions[canonicalEvidenceType];
    if (!provision) {
      return null;
    } else if (typeof provision == 'string' && provision == 'not available') {
      return 'Provision not available, please upload the evidence.';
    } else if (typeof provision == 'object') {
      if (provision.provisions.length > 1) {
        return 'please select 1 provision';
      } else {
        // TO-DO: Currently only first is returned
        return provision.provisions[0].dataOwnerPrefLabel;
      }
    }
  }

  public toggleRetrievalType(
    canonicalEvidenceType: string,
    type: string
  ): void {
    this.retrievalType[canonicalEvidenceType] = type;
  }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
  }

  ngOnChanges(): void {
    this.getEvidenceTypes().map((x) => {
      this.retrievalType[x.tokenName || ''] = 'request';
    });
  }

  ngAfterViewInit(): void {
    // Enable Bootstrap tooltip
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((element) => new bootstrap.Tooltip(element));
  }
}
