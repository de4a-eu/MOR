import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataLoaderXmlService } from 'src/app/services/data-loader-xml.service';

@Component({
  selector: 'app-mor-p',
  templateUrl: './mor-p.component.html',
  styleUrls: ['./mor-p.component.css'],
})
export class MorPComponent implements OnInit {
  public BirthCertificateExample: string = '';

  @Input('defaultLang') defaultLanguage!: string;
  @Input('postActionValue') postActionValue!: string;
  private postActionValueObject: any;
  public selectedLanguage!: string;
  public showDescription: boolean = true;

  constructor(private dataLoaderXml: DataLoaderXmlService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultLanguage'])
      this.selectedLanguage = this.defaultLanguage;
  }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
    this.dataLoaderXml
      .loadXml('BirthCertificate.xml', 'examples')
      .then((result) => (this.BirthCertificateExample = result));
    
    this.postActionValue = '[{"canonicalEvidenceType":"BirthCertificate","uploadedDocument":"<BirthEvidence><Identifier>123456789</Identifier><IssueDate>01/01/1990</IssueDate><IssuingAuthority>Don\'t know</IssuingAuthority><IssuingPlace>Pluton</IssuingPlace><CertifiesBirth><Child><GivenName>Lisa</GivenName><FamilyName>Simpson</FamilyName><Gender>Female</Gender><BirthDate>20/02/2002</BirthDate><PlaceOfBirth><geographicIdentifier></geographicIdentifier><geographicName>Springfield, Earth</geographicName></PlaceOfBirth></Child><Parent><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName></Parent></CertifiesBirth></BirthEvidence>"},{"canonicalEvidenceType":"MarriageCertificate","provision":{"dataOwnerId":"iso6523-actorid-upis::9991:SI990000105","dataOwnerPrefLabel":"Minister za notranje zadeve","atuCode":"SI","atuLatinName":"SLOVENIJA","provisionType":"ip"}}]';
    this.postActionValueObject = JSON.parse(this.postActionValue);
  }
}
