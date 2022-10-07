import { Component, OnInit, ElementRef } from "@angular/core";
import { CanonicalEvidenceType } from "src/app/classes/canonical-evidence-type";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { StorageService } from "src/app/services/storage.service";

declare var bootstrap: any;

@Component({
  selector: "de4a-mor-p",
  templateUrl: "./mor-p.component.html",
})
export class MORPComponent implements OnInit {
  /**
   * Input parameters
   */
  defaultLanguage: string;
  postActionValue!: string;

  /**
   * Do not show component content if input parameters are invalid
   */
  inputParamsValid: boolean = true;

  /**
   * Show description
   */
  public showDescription: boolean = true;

  /**
   * Preview is complete
   */
  public complete: boolean = false;

  private postActionValueObject: any[] = [];

  public modalPreview: any;

  public selectedEvidenceType!: string;

  /**
   * Status of preview
   */
  public confirmSendStatus: any = {};

  /**
   * Content of uploaded files
   */
  public uploads: any = {};

  constructor(
    public elementRef: ElementRef,
    private storage: StorageService,
    public dataLoader: DataLoaderService
  ) {
    /**
     * Get (static) input parameters of MOR-P component and
     * check their validity
     */
    const native = this.elementRef.nativeElement;
    this.defaultLanguage = native.getAttribute("default-lang");
    if (
      !this.dataLoader
        .getLanguages()
        .map((lang) => lang.code)
        .includes(this.defaultLanguage)
    )
      this.inputParamsValid = false;
    else {
      dataLoader.setDefaultLanguage(this.defaultLanguage);
      dataLoader.setLanguage(this.defaultLanguage);
    }

    this.postActionValue = native.getAttribute("post-action-value");
    if (this.postActionValue) {
      // Convert input parameters to object
      try {
        this.postActionValue = atob(this.postActionValue);
        this.postActionValueObject = JSON.parse(this.postActionValue);
      } catch (e) {
        this.postActionValue = "[]";
        this.postActionValueObject = JSON.parse(this.postActionValue);
      }
      this.postActionValueObject.map((x) => {
        this.confirmSendStatus[x.canonicalEvidenceType] = { include: true };
      });

      if (this.postActionValueObject.length <= 0) this.inputParamsValid = false;
    } else {
      this.inputParamsValid = false;
    }

    /*let birthSchema =
      "<n3:BirthEvidence xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:person='http://www.w3.org/ns/corevocabulary/person' xmlns:n1='http://www.altova.com/samplexml/other-namespace' xmlns:cvb='http://www.w3.org/ns/corevocabulary/BasicComponents' xmlns:cva='http://www.w3.org/ns/corevocabulary/AggregateComponents' xmlns:n3='urn:eu-de4a:xsd:CanonicalEvidenceType::BirthEvidence:v1.7' xmlns:cbc='urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' xmlns:ext='urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2' xsi:schemaLocation='urn:eu-de4a:xsd:CanonicalEvidenceType::BirthEvidence:v1.7 birthEvidence-1.7.xsd'>" +
      "<n3:Identifier>" +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      "<cbc:IssueDate>1957-08-13</cbc:IssueDate>" +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      "</n3:Identifier>" +
      "<n3:IssueDate>1957-08-13</n3:IssueDate>" +
      "<n3:IssuingAuthority>" +
      "<n3:Identifier>" +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      "<cbc:IssueDate>1957-08-13</cbc:IssueDate>" +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      "</n3:Identifier>" +
      "<n3:PrefLabel languageID='en-us' languageLocaleID='normalizedString'>String</n3:PrefLabel>" +
      "</n3:IssuingAuthority>" +
      "<n3:IssuingPlace>" +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      "<n3:AdminUnitL2>ITI2</n3:AdminUnitL2>" +
      "<n3:AdminUnitL1>ISR</n3:AdminUnitL1>" +
      "</n3:IssuingPlace>" +
      "<n3:CertifiesBirth>" +
      "<n3:Child>" +
      "<n3:PersonName>" +
      "<n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName>" +
      "<n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName>" +
      "</n3:PersonName>" +
      "<n3:Identifier>" +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      "<cbc:IssueDate>1957-08-13</cbc:IssueDate>" +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      "</n3:Identifier>" +
      "<n3:Citizenship>" +
      "<n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier>" +
      "<n3:Name>MKD</n3:Name>" +
      "</n3:Citizenship>" +
      "<n3:DateOfBirth>" +
      "<n3:Year>2001</n3:Year>" +
      "<n3:Month>--12</n3:Month>" +
      "<n3:Day>---17</n3:Day>" +
      "</n3:DateOfBirth>" +
      "<n3:Gender>FEMALE</n3:Gender>" +
      "<n3:PlaceOfBirth>" +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      "<n3:AdminUnitL2>DEC04</n3:AdminUnitL2>" +
      "<n3:AdminUnitL1>ATA</n3:AdminUnitL1>" +
      "</n3:PlaceOfBirth>" +
      "</n3:Child>" +
      "<n3:Parent>" +
      "<n3:PersonName>" +
      "<n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName>" +
      "<n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName>" +
      "</n3:PersonName>" +
      "<n3:Identifier>" +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      "<cbc:IssueDate>1957-08-13</cbc:IssueDate>" +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      "</n3:Identifier>" +
      "<n3:Citizenship>" +
      "<n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier>" +
      "<n3:Name>CAN</n3:Name>" +
      "</n3:Citizenship>" +
      "<n3:DateOfBirth>" +
      "<n3:Year>2001</n3:Year>" +
      "<n3:Month>--12</n3:Month>" +
      "<n3:Day>---17</n3:Day>" +
      "</n3:DateOfBirth>" +
      "<n3:Gender>NST</n3:Gender>" +
      "<n3:PlaceOfBirth>" +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      "<n3:AdminUnitL2>DEF0D</n3:AdminUnitL2>" +
      "<n3:AdminUnitL1>BYS</n3:AdminUnitL1>" +
      "</n3:PlaceOfBirth>" +
      "</n3:Parent>" +
      "</n3:CertifiesBirth>" +
      "</n3:BirthEvidence>";

    let marriageSchema =
      "<?xml version='1.0' encoding='UTF-8'?><!--Sample XML file generated by XMLSpy v2022 (x64) (http://www.altova.com)--><n3:MarriageEvidence xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:person='http://www.w3.org/ns/corevocabulary/person' xmlns:n1='http://www.altova.com/samplexml/other-namespace' xmlns:cvb='http://www.w3.org/ns/corevocabulary/BasicComponents' xmlns:cva='http://www.w3.org/ns/corevocabulary/AggregateComponents' xmlns:n3='urn:eu-de4a:xsd:CanonicalEvidenceType::MarriageEvidence:v1.7' xmlns:cbc='urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' xmlns:ext='urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2' xsi:schemaLocation='urn:eu-de4a:xsd:CanonicalEvidenceType::MarriageEvidence:v1.7 marriageEvidence-1.7.xsd'><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:IssueDate>1957-08-13</n3:IssueDate><n3:IssuingAuthority><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PrefLabel languageID='en-us' languageLocaleID='normalizedString'>String</n3:PrefLabel></n3:IssuingAuthority><n3:IssuingPlace><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>HR032</n3:AdminUnitL2><n3:AdminUnitL1>GBR</n3:AdminUnitL1></n3:IssuingPlace><n3:CertifiesMarriage><n3:DateOfMarriage>1957-08-13</n3:DateOfMarriage><n3:Spouse><n3:DateOfBirth><n3:Year>2001</n3:Year><n3:Month>--12</n3:Month><n3:Day>---17</n3:Day></n3:DateOfBirth><n3:PersonName><n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName><n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName></n3:PersonName><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PlaceOfBirth><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>DE12C</n3:AdminUnitL2><n3:AdminUnitL1>HKG</n3:AdminUnitL1></n3:PlaceOfBirth><n3:Gender>FEMALE</n3:Gender><n3:Citizenship><n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier><n3:Name>FIN</n3:Name></n3:Citizenship><n3:FamilyNameAfterMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameAfterMarriage><n3:FamilyNameBeforeMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameBeforeMarriage><n3:MaritalStatusBeforeMarriage>http://eurovoc.europa.eu/5345</n3:MaritalStatusBeforeMarriage></n3:Spouse><n3:Spouse><n3:DateOfBirth><n3:Year>2001</n3:Year><n3:Month>--12</n3:Month><n3:Day>---17</n3:Day></n3:DateOfBirth><n3:PersonName><n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName><n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName></n3:PersonName><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PlaceOfBirth><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>DE269</n3:AdminUnitL2><n3:AdminUnitL1>UZB</n3:AdminUnitL1></n3:PlaceOfBirth><n3:Gender>NST</n3:Gender><n3:Citizenship><n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier><n3:Name>MLI</n3:Name></n3:Citizenship><n3:FamilyNameAfterMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameAfterMarriage><n3:FamilyNameBeforeMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameBeforeMarriage><n3:MaritalStatusBeforeMarriage>http://eurovoc.europa.eu/5345</n3:MaritalStatusBeforeMarriage></n3:Spouse><n3:PlaceOfMarriage><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>FRE12</n3:AdminUnitL2><n3:AdminUnitL1>ERI</n3:AdminUnitL1></n3:PlaceOfMarriage></n3:CertifiesMarriage><n3:CertifiesEndOfMarriage><n3:DateOfEndOfMarriage>1957-08-13</n3:DateOfEndOfMarriage><n3:Cause languageID='en-us' languageLocaleID='normalizedString'>String</n3:Cause></n3:CertifiesEndOfMarriage></n3:MarriageEvidence>";

    this.postActionValue =
      '[{"canonicalEvidenceType":"BirthCertificate","uploadedDocument":"' +
      birthSchema +
      '"},{"canonicalEvidenceType":"MarriageCertificate","uploadedDocument":"' +
      marriageSchema +
      '"}]';
    console.log(this.postActionValue);
    console.log(btoa(this.postActionValue));*/
  }

  /**
   * Get evidence types for preview
   *
   * @returns array of evidence types with `name`, `code` and `tokenName`
   */
  public getEvidenceTypes(): CanonicalEvidenceType[] {
    let selectedTokenNames = this.postActionValueObject.map(
      (x) => x.canonicalEvidenceType
    );
    let types =
      this.dataLoader.getSelectedCanonicalEvidenceTypes(selectedTokenNames);
    return types;
  }

  /**
   * Checks if content of evidence is available
   *
   * @param tokenName canonical evidence type
   * @returns content of canonical evidence
   */
  public isEvidenceAvailable(tokenName: string | undefined): boolean {
    let result = false;
    if (tokenName) {
      let input = this.postActionValueObject.find(
        (x) => x.canonicalEvidenceType == tokenName
      );
      if (
        input &&
        (input.uploadedDocument || input.payload) &&
        this.confirmSendStatus[tokenName].include
      )
        result = true;
    }
    return result;
  }

  public previewEvidence(tokenName: string | undefined) {
    if (tokenName) {
      this.selectedEvidenceType = tokenName;
      this.modalPreview.show();
    }
  }

  /**
   * Toggle confirm send status for given canonical evidence type
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   */
  public toggleConfirmSendStatus(canonicalEvidenceType: string): void {
    if (!this.confirmSendStatus[canonicalEvidenceType]) {
      this.confirmSendStatus[canonicalEvidenceType] = { include: true };
    } else {
      if (!this.confirmSendStatus[canonicalEvidenceType].include)
        delete this.uploads[canonicalEvidenceType];
      this.confirmSendStatus[canonicalEvidenceType].include =
        !this.confirmSendStatus[canonicalEvidenceType].include;
    }
  }

  public finishPreview() {
    let result: any = {};
    Object.keys(this.confirmSendStatus).map((x: any) => {
      result[x] = {};
      result[x].include = this.confirmSendStatus[x].include;
      if (this.confirmSendStatus[x]) result[x].binaryText = this.uploads[x];
    });

    this.storage.addArray("confirmedCanonicalEvidenceTypes", result);
    this.complete = true;
  }

  public getEvidenceTypeNameForPreview(): string {
    let selectedEvidence = this.getEvidenceTypes().find(
      (x) => x.tokenName == this.selectedEvidenceType
    );
    if (selectedEvidence) return selectedEvidence.name;
    else return "";
  }

  public getEvidenceTypeContentForPreview(): string {
    let selectedEvidence = this.getEvidenceTypes().find(
      (x) => x.tokenName == this.selectedEvidenceType
    );
    let content = "";
    if (selectedEvidence)
      content = this.getEvidenceByType(selectedEvidence.tokenName || "") || "";
    return content;
  }

  /**
   * Get content of canonical evidence
   *
   * @param tokenName canonical evidence type
   * @returns content of canonical evidence
   */
  public getEvidenceByType(tokenName: string): string | null {
    if (!this.isEvidenceAvailable(tokenName)) return null;
    let postActionValue = this.postActionValueObject.find(
      (x) => x.canonicalEvidenceType == tokenName
    );
    return postActionValue.uploadedDocument
      ? postActionValue.uploadedDocument
      : postActionValue.payload;
  }

  ngOnInit(): void {
    this.storage.remove("confirmedCanonicalEvidenceTypes");

    // Bootstrap modals
    this.modalPreview = new bootstrap.Modal(
      document.getElementById("previewEvidenceModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  }
}
