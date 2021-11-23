import { CanonicalEvidenceType } from './canonical-evidence-type';
import { Country } from './country';

export class CanonicalEvidence {
  'type': CanonicalEvidenceType;
  'providerCountry': Country;

  constructor(type: CanonicalEvidenceType, providerCountry: Country) {
    this.type = type;
    this.providerCountry = providerCountry;
  }
}
