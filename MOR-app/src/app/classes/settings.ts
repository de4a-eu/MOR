/*
 * Copyright (C) 2023, Partners of the EU funded DE4A project consortium
 * (https://www.de4a.eu/consortium), under Grant Agreement No.870635
 * Author: Dejan Lavbič (www.lavbic.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Asset's URL addresses
 */
export class URL {
  //public static i18n: string = "./assets/i18n/";
  public static i18n: string =
    "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/";

  //public static fonts: string = "assets/fonts/";
  public static fonts: string =
    "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/fonts/";

  //public static flags: string = "./assets/flags/";
  public static flags: string =
    "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/flags/";

  //public static schemas: string = "./assets/schemas/";
  public static schemas: string =
    "https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/schemas/";
  public static schemaExamples: any = {
    BirthCertificate: "birth-evidence-1.7-generated-example.xml",
    MarriageCertificate: "marriage-evidence-1.7-generated-example.xml",
    DomicileRegistrationCertificate: "domicile-evidence-example.xml",
  };

  /**
   * {string} Server base pathof the IAL api
   */
  public static serverIALapi: string =
    "https://de4a.simplegob.com/ial/api/provision/";

  /**
   * Client side filtering of IAL api environment
   */
  public static serverIALapiEnvironmentFilter: any = {
    playground: "mock-it2",
    test: "test-it2",
    pilot: "",
  };

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
  public static generateIalData: boolean = false;
  public static generateIalDataRange: number[] = [5, 10];
}
