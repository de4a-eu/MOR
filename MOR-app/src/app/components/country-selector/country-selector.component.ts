import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataLoaderCountriesService } from 'src/app/services/data-loader-countries.service';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit {
  @Input('countryCode') countryCode!: string;
  @Input('disabledCountryCode') disabledCountryCode!: string;
  @Output() countryCodeChange = new EventEmitter();

  constructor(public countries: DataLoaderCountriesService) {}

  public getCountryName(code: string): string | null {
    let country = this.countries.getCountries().find((x) => code == x.code);
    return country ? country.name : null;
  }

  public getCountryFlagCode(code: string): string | null {
    let country = this.countries.getCountries().find((x) => code == x.code);
    return country
      ? country.flagCode
        ? country.flagCode
        : country.code
      : null;
  }

  public isCountryDisabled(code: string) {
    if (code == this.disabledCountryCode) return true;
    else return false;
  }

  public setCountry(code: string) {
    this.countryCode = code;
    this.countryCodeChange.emit(code);
  }

  ngOnInit(): void {}
}
