import { Component, Input, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { DataLoaderStorageService } from 'src/app/services/data-loader-storage.service';

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

  constructor(private dataLoaderStorage: DataLoaderStorageService) {}

  ngOnInit(): void {
    this.dataLoaderStorage.storageChange$.subscribe((result) => {
      if (result.key === 'inputPreview') this.postActionValue = result.value;
    });

    this.postActionValue =
      '[{"canonicalEvidenceType":"BirthCertificate","uploadedDocument":"<BirthEvidence><Identifier>123456789</Identifier><IssueDate>01/01/1990</IssueDate><IssuingAuthority>Don\'t know</IssuingAuthority><IssuingPlace>Pluton</IssuingPlace><CertifiesBirth><Child><GivenName>Lisa</GivenName><FamilyName>Simpson</FamilyName><Gender>Female</Gender><BirthDate>20/02/2002</BirthDate><PlaceOfBirth><geographicIdentifier></geographicIdentifier><geographicName>Springfield, Earth</geographicName></PlaceOfBirth></Child><Parent><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName></Parent></CertifiesBirth></BirthEvidence>"},{"canonicalEvidenceType":"MarriageCertificate","uploadedDocument":"<MarriageCertificate><MarriageDate>01/01/1990</MarriageDate><PlaceOfMarriage><geographicIdentifier/><geographicName>Springfield, Earth</geographicName></PlaceOfMarriage><Spouse><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName><Gender>Male</Gender><BirthDate>01/05/1970</BirthDate><Identifier><IdType>SS Number</IdType><Number>9984430223</Number></Identifier></Spouse><Spouse><GivenName>Marge</GivenName><FamilyName>Singleton</FamilyName><Gender>Female</Gender><BirthDate>11/01/1970</BirthDate><Identifier><IdType>SS Number</IdType><Number>3300987734</Number></Identifier></Spouse></MarriageCertificate>"}]';
  }
}
