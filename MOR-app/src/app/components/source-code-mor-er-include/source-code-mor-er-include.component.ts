import { Component, OnInit, Input } from '@angular/core';
import {
  faGlobeEurope,
  faSignInAlt,
  faCode,
  faExclamationCircle,
  faMinus,
  faPlus,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-source-code-mor-er-include',
  templateUrl: './source-code-mor-er-include.component.html',
  styleUrls: ['./source-code-mor-er-include.component.css'],
})
export class SourceCodeMorErIncludeComponent implements OnInit {
  faGlobeEurope = faGlobeEurope;
  faSignInAlt = faSignInAlt;
  faCode = faCode;
  faExclamationCircle = faExclamationCircle;
  faMinus = faMinus;
  faPlus = faPlus;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() defaultLanguage!: string;
  @Input() requesterCountryCode!: string;
  @Input() selectedCanonicalEvidenceTypes!: string;
  @Input() outputJSArrayId!: string;

  public isDisplayed: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
