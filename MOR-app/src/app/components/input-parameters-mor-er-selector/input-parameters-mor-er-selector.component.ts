import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  faSignInAlt,
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-parameters-mor-er-selector',
  templateUrl: './input-parameters-mor-er-selector.component.html',
  styleUrls: ['./input-parameters-mor-er-selector.component.css'],
})
export class InputParametersMorErSelectorComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faExclamationCircle = faExclamationCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public isDisplayed: boolean = true;

  @Input() defaultLanguage: string = 'en';
  @Output() defaultLanguageChange = new EventEmitter<string>();
  updateDefaultLanguage() {
    this.defaultLanguageChange.emit(this.defaultLanguage);
  }

  @Input() requesterCountry: string = 'ES';
  @Output() requesterCountryChange = new EventEmitter<string>();
  updateRequesterCountry() {
    this.requesterCountryChange.emit(this.requesterCountry);
  }

  @Input() canonicalEvidenceTypes: string =
    'BirthCertificate,MarriageCertificate';
  @Output() canonicalEvidenceTypesChange = new EventEmitter<string>();
  updateCanonicalEvidenceTypes() {
    this.canonicalEvidenceTypesChange.emit(this.canonicalEvidenceTypes);
  }

  public outputJSArrayId: string = 'outputJSArrayIdMorEr';
  @Output() outputJSArrayIdChange = new EventEmitter<string>();
  updateOutputJSArrayId() {
    this.outputJSArrayIdChange.emit(this.outputJSArrayId);
  }

  constructor() {}

  ngOnInit(): void {}
}
