import { Injectable } from '@angular/core';
import { XMLParser } from 'fast-xml-parser';

import { Country } from '../classes/country';
import { Language } from '../classes/language';
import { CanonicalEvidenceType } from '../classes/canonical-evidence-type';

import NUTS0 from 'src/assets/NUTS0.json';
import Langs from 'src/assets/languages.json';
import CanonicalEvidenceTypes from 'src/assets/canonical-evidence-types.json';

import BirthCertificateIP from 'src/assets/ial/deprecated/IP/BirthCertificate.json';
import BirthCertificateUSIP from 'src/assets/ial/deprecated/USIP/BirthCertificate.json';
import MarriageCertificateIP from 'src/assets/ial/deprecated/IP/MarriageCertificate.json';
import MarriageCertificateUSIP from 'src/assets/ial/deprecated/USIP/MarriageCertificate.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderService {
  private countries: Country[] = NUTS0;
  private languages: Language[] = Langs;
  private canonicalEvidenceTypes: CanonicalEvidenceType[] =
    CanonicalEvidenceTypes;

  constructor() {
    this.loadMockedIalXml([
      'ial-es-birth2.xml',
      'ial-es-marriage1.xml',
      'ial-si-birth1-marriage1.xml',
      'ial-si-marriage1.xml',
    ]);
  }

  public parser = new XMLParser({ ignoreAttributes: false });

  private mockupIalXmlResponses: any = {};

  private mockupIalResponses: any = {
    IP: {
      BirthCertificate: BirthCertificateIP,
      MarriageCertificate: MarriageCertificateIP,
    },
    USIP: {
      BirthCertificate: BirthCertificateUSIP,
      MarriageCertificate: MarriageCertificateUSIP,
    },
  };

  public getTranslationLanguages = () => {
    return ['en', 'sl', 'es', 'pt', 'fr'];
  };

  public getTranslationDefaultLanguage = () => {
    return 'en';
  };

  public getCountries = () => {
    return this.countries;
  };

  public getCountryName = (code: string) => {
    let country = this.countries.find((x) => x.code == code);
    return country ? country.name : null;
  };

  public getLanguages = (): Language[] => {
    return this.languages;
  };

  public getAllCanonicalEvidenceTypes = () => {
    return this.canonicalEvidenceTypes;
  };

  public getSelectedCanonicalEvidenceTypes = (
    tokenNames: string
  ): CanonicalEvidenceType[] => {
    let listOfTokenNames: string[] = tokenNames.split(',');
    return this.canonicalEvidenceTypes.filter((x) =>
      listOfTokenNames.includes(x.tokenName || '')
    );
  };

  public async loadXml(file: string, type: string): Promise<string> {
    return await (
      await fetch('assets/canonical-evidence-types/' + type + '/' + file)
    ).text();
  }

  public async loadXmlIal(file: string): Promise<string> {
    return await (await fetch('assets/ial/' + file)).text();
  }

  private loadMockedIalXml = async (files: string[]) => {
    for (let i = 0; i < files.length; i++) {
      let data: any = await this.loadXmlIal(files[i]);
      //console.log(data);
      data = this.parser.parse(data);
      data = JSON.stringify(data, (_, value) => {
        return value && typeof value === 'object' && !Array.isArray(value)
          ? Object.fromEntries(
              Object.entries(value).map(([key, value]) => [
                key.split(':')[1] ? key.split(':')[1] : key,
                value,
              ])
            )
          : value;
      });
      data = JSON.parse(data);
      data = data['ResponseLookupRoutingInformation']['ResponseItem'];
      let evidenceType = data['@_CanonicalObjectTypeId'].split(':')[3];
      //console.log(evidenceType);
      data = data['ResponsePerCountry'];
      let countryCode = data['@_CountryCode'];
      //console.log(countryCode);
      if (data['Provision']) {
        data = data['Provision'];
        if (typeof data == 'object') data = [data];
        if (data.length > 0) {
          if (!this.mockupIalXmlResponses[evidenceType])
            this.mockupIalXmlResponses[evidenceType] = {};
          if (!this.mockupIalXmlResponses[evidenceType][countryCode])
            this.mockupIalXmlResponses[evidenceType][countryCode] = [];
          this.mockupIalXmlResponses[evidenceType][countryCode] = data;
        }
      }
    }
    //console.log(this.mockupIalXmlResponses);
  };

  // Mockup API method for call to:
  // /ial/{canonicalEvidenceTypeId}/{countryCode}
  public getIal(
    canonicalEvidenceTypeId: string,
    countryCode: string,
    pattern: string
  ): any {
    // Check canonical evidence type id
    if (
      !this.getAllCanonicalEvidenceTypes().find(
        (x) => x.tokenName == canonicalEvidenceTypeId
      )
    )
      return null;
    // Check country code
    if (!this.getCountries().find((x) => x.code == countryCode)) return null;
    // Check pattern
    if (!['IP', 'USIP'].includes(pattern)) return null;

    // Available mockup responses
    if (this.mockupIalResponses[pattern][canonicalEvidenceTypeId]) {
      let result = this.mockupIalResponses[pattern][
        canonicalEvidenceTypeId
      ].find((x: any) => x.countryCode == countryCode);
      //console.log(result);
      return result ? result : null;
    }

    return null;

    /*console.log('-------------------------------------');
    canonicalEvidenceTypeId = canonicalEvidenceTypeId.replace(
      'Certificate',
      'Evidence'
    );
    console.log(canonicalEvidenceTypeId);
    console.log(countryCode);
    console.log(this.mockupIalXmlResponses);
    if (
      this.mockupIalXmlResponses[canonicalEvidenceTypeId] &&
      this.mockupIalXmlResponses[canonicalEvidenceTypeId][countryCode]
    ) {
      console.log('Našel ...');
      console.log(
        this.mockupIalXmlResponses[canonicalEvidenceTypeId][countryCode]
      );
    }
    console.log('-------------------------------------');

    return this.mockupIalXmlResponses[canonicalEvidenceTypeId] &&
      this.mockupIalXmlResponses[canonicalEvidenceTypeId][countryCode]
      ? {
          countryCode: countryCode,
          provisions:
            this.mockupIalXmlResponses[canonicalEvidenceTypeId][countryCode],
        }
      : null;*/
  }
}
