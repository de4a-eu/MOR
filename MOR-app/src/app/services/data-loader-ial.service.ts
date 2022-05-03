import { Injectable } from '@angular/core';
import { DataLoaderCanonicalEvidenceTypesService } from './data-loader-canonical-evidence-types.service';
import { DataLoaderCountriesService } from './data-loader-countries.service';

import BirthCertificateIP from 'src/app/services/data/ial/IP/BirthCertificate.json';
import BirthCertificateUSIP from 'src/app/services/data/ial/USIP/BirthCertificate.json';
import MarriageCertificateIP from 'src/app/services/data/ial/IP/MarriageCertificate.json';
import MarriageCertificateUSIP from 'src/app/services/data/ial/USIP/MarriageCertificate.json';
import { DataLoaderXmlService } from './data-loader-xml.service';
import { XMLParser } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderIalService {
  constructor(
    private dataLoaderCanonicalEvidenceTypes: DataLoaderCanonicalEvidenceTypesService,
    private dataLoaderCountries: DataLoaderCountriesService,
    private dataLoaderXml: DataLoaderXmlService
  ) {
    this.loadMockedIalXml([
      'ial-es-birth2.xml',
      'ial-es-marriage1.xml',
      'ial-si-birth1-marriage1.xml',
      'ial-si-marriage1.xml',
    ]);
  }

  private loadMockedIalXml = async (files: string[]) => {
    for (let i = 0; i < files.length; i++) {
      let data: any = await this.dataLoaderXml.loadXmlIal(files[i]);
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

  // Mockup API method for call to:
  // /ial/{canonicalEvidenceTypeId}/{countryCode}
  public getIal(
    canonicalEvidenceTypeId: string,
    countryCode: string,
    pattern: string
  ): any {
    // Check canonical evidence type id
    if (
      !this.dataLoaderCanonicalEvidenceTypes
        .getAllCanonicalEvidenceTypes()
        .find((x) => x.tokenName == canonicalEvidenceTypeId)
    )
      return null;
    // Check country code
    if (
      !this.dataLoaderCountries
        .getCountries()
        .find((x) => x.code == countryCode)
    )
      return null;
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
