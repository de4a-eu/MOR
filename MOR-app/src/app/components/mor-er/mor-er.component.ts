import { Component, OnInit, Input, Output } from '@angular/core';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import { DataLoaderCanonicalEvidenceTypesService } from 'src/app/services/data-loader-canonical-evidence-types.service';
import { DataLoaderIalService } from 'src/app/services/data-loader-ial.service';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';

declare var bootstrap: any;

@Component({
  selector: 'app-mor-er',
  templateUrl: './mor-er.component.html',
  styleUrls: ['./mor-er.component.css'],
})
export class MORERComponent implements OnInit {
  faFileCode = faFileCode;

  @Input('defaultLang') defaultLanguage!: string;
  public selectedLanguage!: string;
  @Input('requesterCountryCode') requesterCountry!: string;
  @Input('canonicalEvidenceTypes') canonicalEvidenceTypes!: string;
  @Input('outputJSArrayId') outputJSArrayId!: string;

  constructor(
    private dataLoaderCanonicalEvidenceTypes: DataLoaderCanonicalEvidenceTypesService,
    private dataLoaderIal: DataLoaderIalService
  ) {}

  public canonicalEvidenceCountries: any = {};

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
    console.log(result);
    return result;
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
