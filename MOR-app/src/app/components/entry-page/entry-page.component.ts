import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent implements OnInit {
  public defaultLanguage: string = 'en';
  public requesterCountryCode: string = 'ES';
  public canonicalEvidenceTypes: string =
    'BirthCertificate,MarriageCertificate';
  public outputJSArrayId: string = 'outputJSArrayIdMorEr';

  constructor() {}

  ngOnInit(): void {}
}
