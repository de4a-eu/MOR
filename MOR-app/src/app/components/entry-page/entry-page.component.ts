import { Component, OnInit } from '@angular/core';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent implements OnInit {
  faIdCard = faIdCard;

  public defaultLanguage: string = 'en';
  public defaultLanguagePreview: string = 'sl';
  public requesterCountryCode: string = 'BE';
  public canonicalEvidenceTypes: string =
    'BirthCertificate,MarriageCertificate';
  public outputJSArrayId: string = 'outputJSArrayIdMorEr';
  public postActionValue: string = '[]';

  constructor() {}

  ngOnInit(): void {}
}
