import { Injectable } from '@angular/core';
import { Country } from '../classes/country';
import { Language } from '../classes/language';
import { CanonicalEvidenceType } from '../classes/canonical-evidence-type';
import LanguagesJSON from 'src/app/services/data/languages.json';
import CountriesJSON from 'src/app/services/data/countries.json';
import CanonicalEvidenceTypeJSON from 'src/app/services/data/canonical-evidence-types.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderService {
  private canonicalEvidenceTypes: CanonicalEvidenceType[] =
    CanonicalEvidenceTypeJSON;
  private languages: Language[] = LanguagesJSON;
  private countries: Country[] = CountriesJSON;

  getCanonicalEvidenceTypes = () => {
    return this.canonicalEvidenceTypes;
  };

  getCountries = () => {
    return this.countries;
  };

  getLanguages = () => {
    return this.languages;
  };

  constructor() {}
}
