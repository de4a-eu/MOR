import { Component, Input, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent implements OnInit {
  faIdCard = faIdCard;

  public defaultLanguage: string = 'en';
  public defaultLanguagePreview: string = 'en';
  public requesterCountryCode: string = 'BE';
  public canonicalEvidenceTypes: string =
    'BirthCertificate,MarriageCertificate';
  public outputJSArrayId: string = 'outputJSArrayIdMorEr';
  @Input() postActionValue: string = '[]';

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.storage.storageChange$.subscribe((result) => {
      if (result.key === 'inputPreview') this.postActionValue = result.value;
    });

    let birthSchema =
      "<n3:BirthEvidence xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:person='http://www.w3.org/ns/corevocabulary/person' xmlns:n1='http://www.altova.com/samplexml/other-namespace' xmlns:cvb='http://www.w3.org/ns/corevocabulary/BasicComponents' xmlns:cva='http://www.w3.org/ns/corevocabulary/AggregateComponents' xmlns:n3='urn:eu-de4a:xsd:CanonicalEvidenceType::BirthEvidence:v1.7' xmlns:cbc='urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' xmlns:ext='urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2' xsi:schemaLocation='urn:eu-de4a:xsd:CanonicalEvidenceType::BirthEvidence:v1.7 birthEvidence-1.7.xsd'>" +
      '<n3:Identifier>' +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      '<cbc:IssueDate>1957-08-13</cbc:IssueDate>' +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      '</n3:Identifier>' +
      '<n3:IssueDate>1957-08-13</n3:IssueDate>' +
      '<n3:IssuingAuthority>' +
      '<n3:Identifier>' +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      '<cbc:IssueDate>1957-08-13</cbc:IssueDate>' +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      '</n3:Identifier>' +
      "<n3:PrefLabel languageID='en-us' languageLocaleID='normalizedString'>String</n3:PrefLabel>" +
      '</n3:IssuingAuthority>' +
      '<n3:IssuingPlace>' +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      '<n3:AdminUnitL2>ITI2</n3:AdminUnitL2>' +
      '<n3:AdminUnitL1>ISR</n3:AdminUnitL1>' +
      '</n3:IssuingPlace>' +
      '<n3:CertifiesBirth>' +
      '<n3:Child>' +
      '<n3:PersonName>' +
      "<n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName>" +
      "<n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName>" +
      '</n3:PersonName>' +
      '<n3:Identifier>' +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      '<cbc:IssueDate>1957-08-13</cbc:IssueDate>' +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      '</n3:Identifier>' +
      '<n3:Citizenship>' +
      "<n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier>" +
      '<n3:Name>MKD</n3:Name>' +
      '</n3:Citizenship>' +
      '<n3:DateOfBirth>' +
      '<n3:Year>2001</n3:Year>' +
      '<n3:Month>--12</n3:Month>' +
      '<n3:Day>---17</n3:Day>' +
      '</n3:DateOfBirth>' +
      '<n3:Gender>FEMALE</n3:Gender>' +
      '<n3:PlaceOfBirth>' +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      '<n3:AdminUnitL2>DEC04</n3:AdminUnitL2>' +
      '<n3:AdminUnitL1>ATA</n3:AdminUnitL1>' +
      '</n3:PlaceOfBirth>' +
      '</n3:Child>' +
      '<n3:Parent>' +
      '<n3:PersonName>' +
      "<n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName>" +
      "<n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName>" +
      '</n3:PersonName>' +
      '<n3:Identifier>' +
      "<cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier>" +
      "<cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType>" +
      '<cbc:IssueDate>1957-08-13</cbc:IssueDate>' +
      "<cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority>" +
      "<cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID>" +
      '</n3:Identifier>' +
      '<n3:Citizenship>' +
      "<n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier>" +
      '<n3:Name>CAN</n3:Name>' +
      '</n3:Citizenship>' +
      '<n3:DateOfBirth>' +
      '<n3:Year>2001</n3:Year>' +
      '<n3:Month>--12</n3:Month>' +
      '<n3:Day>---17</n3:Day>' +
      '</n3:DateOfBirth>' +
      '<n3:Gender>NST</n3:Gender>' +
      '<n3:PlaceOfBirth>' +
      "<cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox>" +
      "<cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator>" +
      "<cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName>" +
      "<cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare>" +
      "<cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName>" +
      "<cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode>" +
      "<n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea>" +
      '<n3:AdminUnitL2>DEF0D</n3:AdminUnitL2>' +
      '<n3:AdminUnitL1>BYS</n3:AdminUnitL1>' +
      '</n3:PlaceOfBirth>' +
      '</n3:Parent>' +
      '</n3:CertifiesBirth>' +
      '</n3:BirthEvidence>';

    let marriageSchema = "<?xml version='1.0' encoding='UTF-8'?><!--Sample XML file generated by XMLSpy v2022 (x64) (http://www.altova.com)--><n3:MarriageEvidence xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:person='http://www.w3.org/ns/corevocabulary/person' xmlns:n1='http://www.altova.com/samplexml/other-namespace' xmlns:cvb='http://www.w3.org/ns/corevocabulary/BasicComponents' xmlns:cva='http://www.w3.org/ns/corevocabulary/AggregateComponents' xmlns:n3='urn:eu-de4a:xsd:CanonicalEvidenceType::MarriageEvidence:v1.7' xmlns:cbc='urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2' xmlns:ext='urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2' xsi:schemaLocation='urn:eu-de4a:xsd:CanonicalEvidenceType::MarriageEvidence:v1.7 marriageEvidence-1.7.xsd'><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:IssueDate>1957-08-13</n3:IssueDate><n3:IssuingAuthority><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PrefLabel languageID='en-us' languageLocaleID='normalizedString'>String</n3:PrefLabel></n3:IssuingAuthority><n3:IssuingPlace><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>HR032</n3:AdminUnitL2><n3:AdminUnitL1>GBR</n3:AdminUnitL1></n3:IssuingPlace><n3:CertifiesMarriage><n3:DateOfMarriage>1957-08-13</n3:DateOfMarriage><n3:Spouse><n3:DateOfBirth><n3:Year>2001</n3:Year><n3:Month>--12</n3:Month><n3:Day>---17</n3:Day></n3:DateOfBirth><n3:PersonName><n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName><n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName></n3:PersonName><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PlaceOfBirth><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>DE12C</n3:AdminUnitL2><n3:AdminUnitL1>HKG</n3:AdminUnitL1></n3:PlaceOfBirth><n3:Gender>FEMALE</n3:Gender><n3:Citizenship><n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier><n3:Name>FIN</n3:Name></n3:Citizenship><n3:FamilyNameAfterMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameAfterMarriage><n3:FamilyNameBeforeMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameBeforeMarriage><n3:MaritalStatusBeforeMarriage>http://eurovoc.europa.eu/5345</n3:MaritalStatusBeforeMarriage></n3:Spouse><n3:Spouse><n3:DateOfBirth><n3:Year>2001</n3:Year><n3:Month>--12</n3:Month><n3:Day>---17</n3:Day></n3:DateOfBirth><n3:PersonName><n3:FamilyName languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyName><n3:GivenName languageID='en-us' languageLocaleID='normalizedString'>String</n3:GivenName></n3:PersonName><n3:Identifier><cvb:Identifier languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Identifier><cvb:IdentifierType languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IdentifierType><cbc:IssueDate>1957-08-13</cbc:IssueDate><cvb:IssuingAuthority languageID='en-us' languageLocaleID='normalizedString'>String</cvb:IssuingAuthority><cvb:IssuingAuthorityID schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</cvb:IssuingAuthorityID></n3:Identifier><n3:PlaceOfBirth><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>DE269</n3:AdminUnitL2><n3:AdminUnitL1>UZB</n3:AdminUnitL1></n3:PlaceOfBirth><n3:Gender>NST</n3:Gender><n3:Citizenship><n3:Identifier schemeID='normalizedString' schemeName='String' schemeAgencyID='normalizedString' schemeAgencyName='String' schemeVersionID='normalizedString' schemeDataURI='http://www.altova.com/' schemeURI='http://www.altova.com/'>normalizedString</n3:Identifier><n3:Name>MLI</n3:Name></n3:Citizenship><n3:FamilyNameAfterMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameAfterMarriage><n3:FamilyNameBeforeMarriage languageID='en-us' languageLocaleID='normalizedString'>String</n3:FamilyNameBeforeMarriage><n3:MaritalStatusBeforeMarriage>http://eurovoc.europa.eu/5345</n3:MaritalStatusBeforeMarriage></n3:Spouse><n3:PlaceOfMarriage><cvb:PoBox languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PoBox><cvb:LocatorDesignator languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorDesignator><cvb:LocatorName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:LocatorName><cvb:Thoroughfare languageID='en-us' languageLocaleID='normalizedString'>String</cvb:Thoroughfare><cvb:PostName languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostName><cvb:PostCode languageID='en-us' languageLocaleID='normalizedString'>String</cvb:PostCode><n3:AddressArea languageID='en-us' languageLocaleID='normalizedString'>String</n3:AddressArea><n3:AdminUnitL2>FRE12</n3:AdminUnitL2><n3:AdminUnitL1>ERI</n3:AdminUnitL1></n3:PlaceOfMarriage></n3:CertifiesMarriage><n3:CertifiesEndOfMarriage><n3:DateOfEndOfMarriage>1957-08-13</n3:DateOfEndOfMarriage><n3:Cause languageID='en-us' languageLocaleID='normalizedString'>String</n3:Cause></n3:CertifiesEndOfMarriage></n3:MarriageEvidence>";

    let birthDemoOld =
      "<BirthEvidence><Identifier>123456789</Identifier><IssueDate>01/01/1990</IssueDate><IssuingAuthority>Don't know</IssuingAuthority><IssuingPlace>Pluton</IssuingPlace><CertifiesBirth><Child><GivenName>Lisa</GivenName><FamilyName>Simpson</FamilyName><Gender>Female</Gender><BirthDate>20/02/2002</BirthDate><PlaceOfBirth><geographicIdentifier></geographicIdentifier><geographicName>Springfield, Earth</geographicName></PlaceOfBirth></Child><Parent><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName></Parent></CertifiesBirth></BirthEvidence>";
    let marriageDemoOld =
      '<MarriageCertificate><MarriageDate>01/01/1990</MarriageDate><PlaceOfMarriage><geographicIdentifier/><geographicName>Springfield, Earth</geographicName></PlaceOfMarriage><Spouse><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName><Gender>Male</Gender><BirthDate>01/05/1970</BirthDate><Identifier><IdType>SS Number</IdType><Number>9984430223</Number></Identifier></Spouse><Spouse><GivenName>Marge</GivenName><FamilyName>Singleton</FamilyName><Gender>Female</Gender><BirthDate>11/01/1970</BirthDate><Identifier><IdType>SS Number</IdType><Number>3300987734</Number></Identifier></Spouse></MarriageCertificate>';

    this.postActionValue =
      '[{"canonicalEvidenceType":"BirthCertificate","uploadedDocument":"' +
      //birthDemoOld +
      birthSchema +
      '"},{"canonicalEvidenceType":"MarriageCertificate","uploadedDocument":"' +
      //marriageDemoOld +
      marriageSchema +
      '"}]';
  }
}
