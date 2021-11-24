import { CanonicalEvidenceType } from './canonical-evidence-type';
import { Country } from './country';

export class CanonicalEvidence {
  'type': CanonicalEvidenceType;
  'providerCountry': Country;
  'confirmSending': boolean;
  'status': string;

  constructor(type: CanonicalEvidenceType, providerCountry: Country) {
    this.type = type;
    this.providerCountry = providerCountry;
    this.confirmSending = false;
    this.status = 'Select provider country.';
  }
}
