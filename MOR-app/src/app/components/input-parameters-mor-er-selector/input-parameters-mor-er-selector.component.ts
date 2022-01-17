import { Component, OnInit } from '@angular/core';
import {
  faGlobeEurope,
  faSignInAlt,
  faCode,
  faExclamationCircle,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-parameters-mor-er-selector',
  templateUrl: './input-parameters-mor-er-selector.component.html',
  styleUrls: ['./input-parameters-mor-er-selector.component.css'],
})
export class InputParametersMorErSelectorComponent implements OnInit {
  faGlobeEurope = faGlobeEurope;
  faSignInAlt = faSignInAlt;
  faCode = faCode;
  faExclamationCircle = faExclamationCircle;
  faMinus = faMinus;
  faPlus = faPlus;

  public defaultLanguage: string = "en";
  public requesterCountry: string = "ES";
  public canonicalEvidenceTypes: string = "BirthCertificate,MarriageCertificate"

  constructor() {}

  ngOnInit(): void {}
}
