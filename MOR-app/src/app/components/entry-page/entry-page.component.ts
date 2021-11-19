import { Component, OnInit, Attribute, ElementRef } from '@angular/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css'],
})
export class EntryPageComponent implements OnInit {
  public parameters = {
    requesterCountryCode: '',
    defaultLang: '',
    canonicalEvidenceTypes: [],
  };

  public getCanonicalEvidenceTypes = () => {
    return this.dataLoader.getCanonicalEvidenceTypes();
  };

  public getLanguages = () => {
    return this.dataLoader.getLanguages();
  };

  public setLanguage(code: string) {
    this.parameters.defaultLang = code;
  }

  public getCountries = () => {
    return this.dataLoader.getCountries();
  };

  public setCountry(code: string) {
    this.parameters.requesterCountryCode = code;
  }

  constructor(private dataLoader: DataLoaderService, private el: ElementRef) {
    this.parameters.requesterCountryCode = this.el.nativeElement.getAttribute(
      'requesterCountryCode'
    );
    this.parameters.defaultLang =
      this.el.nativeElement.getAttribute('defaultLang');
    this.parameters.canonicalEvidenceTypes = this.el.nativeElement
      .getAttribute('canonicalEvidenceTypes')
      .split(',');
  }

  ngOnInit(): void {}
}
