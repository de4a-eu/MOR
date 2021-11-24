import { Component, OnInit, Attribute, ElementRef } from '@angular/core';
import { Country } from 'src/app/classes/country';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { Language } from '../../classes/language';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import {
  faGlobeEurope,
  faSignInAlt,
  faCode,
  faExclamationCircle,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent implements OnInit {
  faGlobeEurope = faGlobeEurope;
  faSignInAlt = faSignInAlt;
  faCode = faCode;
  faExclamationCircle = faExclamationCircle;
  faMinus = faMinus;
  faPlus = faPlus;

  public parameters = {
    language: new Language(),
    requesterCountryCode: new Country(),
    canonicalEvidenceTypes: [new CanonicalEvidenceType()],
  };
  public selectedCanonicalEvidenceTypes: string = '';

  public getCanonicalEvidenceTypes = () => {
    return this.dataLoader.getCanonicalEvidenceTypes();
  };

  public getCanonicalEvidenceType(code: string) {
    return this.dataLoader.getCanonicalEvidenceType(code);
  }

  private getSelectedCanonicalEvidenceTypes = () => {
    return this.parameters.canonicalEvidenceTypes
      .map((evidenceType) => evidenceType.code)
      .join(',');
  };

  public isCanonicalEvidenceTypeSelected(code: string): boolean {
    return this.selectedCanonicalEvidenceTypes.includes(code);
  }

  public toggleCanonicalEvidenceType(code: string) {
    if (
      !this.parameters.canonicalEvidenceTypes ||
      this.parameters.canonicalEvidenceTypes.length == 0 ||
      (this.parameters.canonicalEvidenceTypes.length > 0 &&
        Object.keys(this.parameters.canonicalEvidenceTypes[0]).length == 0)
    ) {
      this.parameters.canonicalEvidenceTypes = [];
    }
    if (
      this.parameters.canonicalEvidenceTypes.find(
        (evidenceType) => evidenceType.code == code
      )
    ) {
      this.parameters.canonicalEvidenceTypes =
        this.parameters.canonicalEvidenceTypes.filter((evidenceType) => {
          return evidenceType.code != code;
        });
    } else {
      this.parameters.canonicalEvidenceTypes.push(
        this.getCanonicalEvidenceType(code)
      );
    }
    this.selectedCanonicalEvidenceTypes =
      this.getSelectedCanonicalEvidenceTypes();
  }

  public getLanguages = () => {
    return this.dataLoader.getLanguages();
  };

  public getLanguage(code: string) {
    return this.dataLoader.getLanguage(code);
  }

  public setLanguage(code: string) {
    this.parameters.language = this.getLanguage(code);
  }

  public getCountries = () => {
    return this.dataLoader.getCountries();
  };

  public getCountry(code: string) {
    return this.dataLoader.getCountry(code);
  }

  public setCountry(code: string) {
    this.parameters.requesterCountryCode = this.getCountry(code);
  }

  constructor(private dataLoader: DataLoaderService) {}

  ngOnInit(): void {
    // Set default values for input parameters
    this.parameters.language = this.getLanguage('en');
    this.parameters.requesterCountryCode = this.getCountry('ES');
    this.parameters.canonicalEvidenceTypes = [];
    this.toggleCanonicalEvidenceType('birth');
    this.toggleCanonicalEvidenceType('marriage');
  }
}
