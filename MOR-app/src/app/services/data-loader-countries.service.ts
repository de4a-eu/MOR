import { Injectable } from '@angular/core';
import { Country } from '../classes/country';
import NUTS0 from 'src/app/services/data/NUTS0.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderCountriesService {
  private countries: Country[] = NUTS0;

  constructor() {}

  getCountries = () => {
    return this.countries;
  };

  getName = (code: string) => {
    let country = this.countries.find(x => x.code == code);
    return country ? country.name : null;
  }

  getAtuLevels = () => {
    return ['nuts0', 'nuts1', 'nuts2', 'nuts3', 'lau', 'edu'];
  };
}
