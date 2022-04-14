/**
 * @TODO Remove `code` from JSON file and only keep `tokenName`, which will become mandatory.
 */
export class CanonicalEvidenceType {
  'name': string;
  'code': string;
  'tokenName'?: string;
  'morID'?: string;
}
