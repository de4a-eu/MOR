import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import {
  faAddressCard,
  faIdCardAlt,
  faCloudUploadAlt,
  faTimes,
  faFileContract,
  faCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { CanonicalEvidence } from 'src/app/classes/canonical-evidence';
import { Country } from 'src/app/classes/country';

@Component({
  selector: 'app-mor',
  templateUrl: './mor.component.html',
  styleUrls: ['./mor.component.css'],
})
export class MORComponent implements OnInit {
  @Input('defaultLang') language!: string;
  @Input('requesterCountryCode') requesterCountry!: string;
  @Input('canonicalEvidenceTypes') canonicalEvidenceTypes!: string;

  public evidences: CanonicalEvidence[] = [];

  constructor(private dataLoader: DataLoaderService) {}

  private getCanonicalEvidenceType(code: string) {
    return this.dataLoader.getCanonicalEvidenceType(code);
  }

  public getEvidenceProviderCountry(evidenceCode: string): Country {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    return evidence.providerCountry;
  }

  public setEvidenceProviderCountry(
    evidenceCode: string,
    countryCode: string
  ): void {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    evidence.providerCountry = this.getCountry(countryCode);
    evidence.status = 'Preview and select appropriate action.';
  }

  public evidenceProviderCountrySet(evidenceCode: string): boolean {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    return evidence.providerCountry.code != undefined;
  }

  public getLanguage(code: string) {
    return this.dataLoader.getLanguage(code);
  }

  public getCountries = () => {
    return this.dataLoader.getCountries();
  };

  public getCountry(code: string) {
    return this.dataLoader.getCountry(code);
  }

  public confirmSending(evidenceCode: string): void {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    evidence.status = 'Evidence is confirmed for sending.';
  }

  public cancelSending(evidenceCode: string): void {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    evidence.status = 'Upload evidence.';
  }

  public showUpload(evidenceCode: string): boolean {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    return evidence.status == 'Upload evidence.';
  }

  public showDocument(evidenceCode: string): boolean {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    return (
      evidence.status == 'Preview and select appropriate action.' ||
      evidence.status == 'Evidence is confirmed for sending.'
    );
  }

  public showButtons(evidenceCode: string): boolean {
    let evidence: CanonicalEvidence = this.evidences.filter(
      (evidence) => evidence.type.code == evidenceCode
    )[0];
    return evidence.status == 'Preview and select appropriate action.';
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['canonicalEvidenceTypes']) {
      this.evidences = [];
      let codes = this.canonicalEvidenceTypes.split(',');
      if (codes.length > 0) {
        codes.forEach((code) => {
          if (code.length > 0)
            this.evidences.push(
              new CanonicalEvidence(
                this.getCanonicalEvidenceType(code),
                new Country()
              )
            );
        });
      }
    }
  }

  faAddressCard = faAddressCard;
  faIdCardAlt = faIdCardAlt;
  faCloudUploadAlt = faCloudUploadAlt;
  faTimes = faTimes;
  faFileContract = faFileContract;
  faCheck = faCheck;
  faExclamationCircle = faExclamationCircle;
}
