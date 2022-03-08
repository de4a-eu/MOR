import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataLoaderCountriesService } from 'src/app/services/data-loader-countries.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit {
  @Input('countryCode') countryCode!: string;
  @Input('defaultLanguage') defaultLanguage!: string;
  @Input('disabledCountryCode') disabledCountryCode!: string;
  @Output() countryCodeChange = new EventEmitter();

  constructor(
    public countries: DataLoaderCountriesService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'sl', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultLanguage'])
      this.translate.use(this.defaultLanguage);
  }

  ngOnInit(): void {}
}
