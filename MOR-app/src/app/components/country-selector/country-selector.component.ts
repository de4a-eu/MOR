import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { Country } from 'src/app/classes/country';

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
    public dataLoader: DataLoaderService,
    public translate: TranslateService
  ) {
    translate.addLangs(this.dataLoader.getTranslationLanguages());
    translate.setDefaultLang(this.dataLoader.getTranslationDefaultLanguage());
    translate.use(this.dataLoader.getTranslationDefaultLanguage());
  }

  public getCountryName(code: string): string | null {
    let country = this.dataLoader.getCountries().find((x) => code == x.code);
    let name: string | null = null;
    if (country)
      name = this.translate.instant(
        'NUTS0Enum/' + country.code + '.' + this.defaultLanguage + '.label'
      );
    return name;
  }

  public getCountryFlagCode(code: string): string | null {
    let country = this.dataLoader.getCountries().find((x) => code == x.code);
    return country
      ? country.flagCode
        ? country.flagCode
        : country.code
      : null;
  }

  public getCountries(): Country[] {
    let countries = this.dataLoader.getCountries();
    countries.map(
      (x) =>
        (x.name = this.translate.instant(
          'NUTS0Enum/' + x.code + '.' + this.defaultLanguage + '.label'
        ))
    );
    return countries;
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
    if (changes['defaultLanguage']) this.translate.use(this.defaultLanguage);
  }

  ngOnInit(): void {}
}
