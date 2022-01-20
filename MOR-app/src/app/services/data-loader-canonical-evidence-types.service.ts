/**
 * @TODO Remove `code` from JSON file and only keep `tokenName`
 */
import { Injectable } from '@angular/core';
import { CanonicalEvidenceType } from '../classes/canonical-evidence-type';
import CanonicalEvidenceTypes from 'src/app/services/data/canonical-evidence-types.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderCanonicalEvidenceTypesService {
  constructor() {}

  private canonicalEvidenceTypes: CanonicalEvidenceType[] =
    CanonicalEvidenceTypes;

  getAllCanonicalEvidenceTypes = () => {
    return this.canonicalEvidenceTypes;
  };

  getSelectedCanonicalEvidenceTypes = (
    tokenNames: string
  ): CanonicalEvidenceType[] => {
    let listOfTokenNames: string[] = tokenNames.split(',');
    return this.canonicalEvidenceTypes.filter((x) =>
      listOfTokenNames.includes(x.tokenName || '')
    );
  };
}
