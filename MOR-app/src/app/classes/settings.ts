/**
 * Asset's URL addresses
 */
export class URL {
  public static i18n: string = "./assets/i18n/";
  /*public static i18n: string =
    "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/";*/

  public static flags: string = "./assets/flags/";

  public static schemas: string = "./assets/schemas/";
  /*public static schemas: string = "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/canonical-evidence-types/examples/";*/
  public static schemaExamples: any = {
    BirthCertificate: "birth-evidence-1.7-generated-example.xml",
    MarriageCertificate: "marriage-evidence-1.7-generated-example.xml",
    DomicileRegistrationCertificate: "domicile-evidence-example.xml"
  };

  /**
   * {string} Server base pathof the IAL api
   */
   public static serverIALapi: string = "https://de4a.simplegob.com/ial/api/provision/";

   /**
    * {string} Preffix for all canonical evidence URNs
    */
   public static canEvidUrn: string = "urn:de4a-eu:CanonicalEvidenceType::";
}

/**
 * Generating dummy data
 */
export class DummyData {
  /**
   * If no response is received from IAL service, generate random data
   */
  public static generateIalData: boolean = true;
  public static generateIalDataRange: number[] = [5, 10];
}
