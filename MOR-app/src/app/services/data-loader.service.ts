import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Language } from "src/app/classes/language";
import { Country } from "src/app/classes/country";
import { TranslateService } from "@ngx-translate/core";
import { CanonicalEvidenceType } from "../classes/canonical-evidence-type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataLoaderService {
  /**
   * Shared parameters
   */
  public countryCode: any = {};
  public defaultLanguage!: string;
  public selectedLanguage!: string;
  public disabledCountryCode!: string;

  /**
   * Private parameters
   */
  public countries: Country[] = [
    { code: "AT", name: "Austria" },
    { code: "BE", name: "Belgium" },
    { code: "BG", name: "Bulgaria" },
    { code: "HR", name: "Croatia" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "EE", name: "Estonia" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "EL", name: "Greece", flagCode: "GR" },
    { code: "HU", name: "Hungary" },
    { code: "IE", name: "Ireland" },
    { code: "IT", name: "Italy" },
    { code: "LV", name: "Latvia" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MT", name: "Malta" },
    { code: "NL", name: "Netherlands" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "RO", name: "Romania" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "ES", name: "Spain" },
    { code: "SE", name: "Sweden" },
  ];

  private languages: Language[] = [
    { code: "en", name: "English", flagCode: "GB" },
    { code: "sl", name: "Slovenian", flagCode: "SI" },
    { code: "es", name: "Spanish", flagCode: "ES" },
    { code: "pt", name: "Portuguese", flagCode: "PT" },
    { code: "fr", name: "French", flagCode: "FR" },
    { code: "ro", name: "Romanian", flagCode: "RO" },
  ];

  public canonicalEvidenceTypes: CanonicalEvidenceType[] = [
    {
      name: "Birth certificate",
      tokenName: "BirthCertificate",
      morID: "BirthEvidence",
    },
    {
      name: "Marriage certificate",
      tokenName: "MarriageCertificate",
      morID: "MarriageEvidence",
    },
    {
      name: "Domicile registration certificate",
      tokenName: "DomicileRegistrationCertificate",
      morID: "DomicileRegistrationEvidence",
    },
    {
      name: "Company registration",
      tokenName: "CompanyRegistration",
    },
    {
      name: "Higher education certificate",
      tokenName: "HigherEdCertificate",
    },
    {
      name: "Secondary education certificate",
      tokenName: "SecondaryEdCertificate",
    },
  ];

  constructor(public translate: TranslateService, private http: HttpClient) {
    translate.addLangs(this.languages.map((language) => language.code));
    this.setDefaultLanguage(this.defaultLanguage);
    this.setLanguage(this.selectedLanguage);
  }

  /**
   * Get selected canonical evidence types accroding to
   * input parameters of MOR ER
   * @param canonicalEvidenceTypes array of canonical evidence types
   * @returns array of selected canonical evidence types
   */
  public getSelectedCanonicalEvidenceTypes = (
    canonicalEvidenceTypes: string[]
  ): CanonicalEvidenceType[] => {
    return this.canonicalEvidenceTypes.filter((evidenceType) =>
      canonicalEvidenceTypes.includes(evidenceType.tokenName || "")
    );
  };

  /**
   * Get all languages
   * @returns { Language[] } List of languages
   */
  public getLanguages(): Language[] {
    let translatedLanguages = this.languages;
    translatedLanguages.map((language) => {
      language.name = this.translate.instant(
        "LangEnum/" + language.code + "." + this.selectedLanguage + ".label"
      );
    });
    return translatedLanguages;
  }

  /**
   * Get language name by selected language code
   * @returns { string | null } Language name
   */
  public getLanguageName(): string | null {
    let language = this.languages.find(
      (lang) => this.selectedLanguage == lang.code
    );
    let name: string | null = null;
    if (language)
      name = this.translate.instant(
        "LangEnum/" + language.code + "." + this.selectedLanguage + ".label"
      );
    return name;
  }

  /**
   * Get language flag code by selected country code
   * @returns { string | null } Language flag code
   */
  public getLanguageFlagCode(): string | null {
    let language = this.languages.find(
      (lang) => this.selectedLanguage == lang.code
    );
    return language ? language.flagCode : null;
  }

  /**
   * Set language by country code
   * @param code { string } Country code
   */
  public setLanguage(code: string) {
    this.selectedLanguage = code;
    this.translate.use(this.selectedLanguage);
  }

  /**
   * Set default languageby country code
   * @param code { string } Country code
   */
  public setDefaultLanguage(code: string) {
    this.defaultLanguage = code;
    this.translate.setDefaultLang(this.defaultLanguage);
  }

  /**
   * Get all countries
   * @returns { Country[] } List of countries
   */
  public getCountries(): Country[] {
    let translatedCountries = this.countries;
    translatedCountries.map(
      (country) =>
        (country.name = this.translate.instant(
          "NUTS0Enum/" + country.code + "." + this.selectedLanguage + ".label"
        ))
    );
    return translatedCountries;
  }

  /**
   * Get country name by country code
   * @param canonicalEvidenceType { string } Canonical evidence type
   * @returns { string | null } Country name
   */
  public getCountryName(canonicalEvidenceType: string): string | null {
    let country = this.countries.find(
      (x) => this.countryCode[canonicalEvidenceType] == x.code
    );
    let name: string | null = null;
    if (country)
      name = this.translate.instant(
        "NUTS0Enum/" + country.code + "." + this.selectedLanguage + ".label"
      );
    return name;
  }

  public getCountryNameByCode(code: string): string {
    let name = "";
    let country = this.countries.find((x) => code == x.code);
    if (country)
      name = this.translate.instant(
        "NUTS0Enum/" + country.code + "." + this.selectedLanguage + ".label"
      );
    return name;
  }

  /**
   * Get country flag code by country code
   * @param canonicalEvidenceType { string } Canonical evidence type
   * @param { string } countryCode Country code
   * @returns { string | null } Country flag code
   */
  public getCountryFlagCode(
    canonicalEvidenceType: string,
    code?: string
  ): string | null {
    if (!code) code = this.countryCode[canonicalEvidenceType];
    let country = this.countries.find((x) => code == x.code);
    return country
      ? country.flagCode
        ? country.flagCode
        : country.code
      : null;
  }

  /**
   * Check if country by country code is disabled
   * @param code { string } Country code
   * @returns { boolean } True if country is disabled
   */
  public isCountryDisabled(code: string) {
    return code == this.disabledCountryCode;
  }

  /**
   * Set selected country by country code
   * @param canonicalEvidenceType { string } Canonical evidence type
   * @param code { string } Country code
   */
  public setCountry(canonicalEvidenceType: string, code: string) {
    this.countryCode[canonicalEvidenceType] = code;
  }

  public loadXml(url: string): Observable<any> {
    return this.http
      .get(url, { responseType: "text" })
      .pipe(retry(1));
  }

  /**
   * Random number in inclusive range
   * @param min { number } Minimum value
   * @param max { number } Maximum value
   * @returns { number } Random number in inclusive range
   */
  public getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
