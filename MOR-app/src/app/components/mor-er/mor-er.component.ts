import { Component, OnInit, Input, Output } from '@angular/core';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import { DataLoaderCanonicalEvidenceTypesService } from 'src/app/services/data-loader-canonical-evidence-types.service';
import { DataLoaderIalService } from 'src/app/services/data-loader-ial.service';
import { faFileCode, faSignInAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
  public provisions: any = {};

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

  public getIalIP(canonicalEvidenceTypeId: string, countryCode: string): any {
    let result = this.dataLoaderIal.getIal(
      canonicalEvidenceTypeId,
      countryCode,
      'IP'
    );
    return result;
  }

  public requestProvisions(): void {
    for (let canonicalEvidenceType in this.canonicalEvidenceCountries) {
      let provisions = this.getIalIP(
        canonicalEvidenceType,
        this.canonicalEvidenceCountries[canonicalEvidenceType]
      );
      this.provisions[canonicalEvidenceType] = provisions;
    }
  }

  public getProvision(canonicalEvidenceType: string): any {
    let provision = this.provisions[canonicalEvidenceType];
    if (provision != null) {
      // TO-DO: Currently only first is returned
      return provision.provisions[0].dataOwnerPrefLabel;
    } return "not available";
  }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
  }

  ngAfterViewInit(): void {
    // Enable Bootstrap tooltip
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((element) => new bootstrap.Tooltip(element));
  }
}
