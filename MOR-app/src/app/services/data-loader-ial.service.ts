import { Injectable } from '@angular/core';
import { DataLoaderCanonicalEvidenceTypesService } from './data-loader-canonical-evidence-types.service';
import { DataLoaderCountriesService } from './data-loader-countries.service';

import BirthCertificateIP from 'src/app/services/data/ial/IP/BirthCertificate.json';
import BirthCertificateUSIP from 'src/app/services/data/ial/USIP/BirthCertificate.json';
import MarriageCertificateIP from 'src/app/services/data/ial/IP/MarriageCertificate.json';
import MarriageCertificateUSIP from 'src/app/services/data/ial/USIP/MarriageCertificate.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderIalService {
  constructor(
    private dataLoaderCanonicalEvidenceTypes: DataLoaderCanonicalEvidenceTypesService,
    private dataLoaderCountries: DataLoaderCountriesService
  ) {}

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
      let result = this.mockupIalResponses[pattern][canonicalEvidenceTypeId].find(
        (x: any) => x.countryCode == countryCode
      );
      return result ? result : null;
    }
    return null;
  }
}
