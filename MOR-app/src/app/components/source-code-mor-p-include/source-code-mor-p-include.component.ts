import { Component, OnInit, Input } from '@angular/core';
import { DataLoaderStorageService } from 'src/app/services/data-loader-storage.service';
import {
  faGlobeEurope,
  faSignInAlt,
  faCode,
  faExclamationCircle,
  faMinus,
  faPlus,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-source-code-mor-p-include',
  templateUrl: './source-code-mor-p-include.component.html',
  styleUrls: ['./source-code-mor-p-include.component.css'],
})
export class SourceCodeMorPIncludeComponent implements OnInit {
  faGlobeEurope = faGlobeEurope;
  faSignInAlt = faSignInAlt;
  faCode = faCode;
  faExclamationCircle = faExclamationCircle;
  faMinus = faMinus;
  faPlus = faPlus;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  @Input() defaultLanguage!: string;
  @Input() postActionValue!: string;
  public confirmedCanonicalEvidenceTypes: string = "[]";

  public isDisplayed: boolean = true;

  constructor(private dataLoaderStorage: DataLoaderStorageService) {}

  ngOnInit(): void {
    this.dataLoaderStorage.storageChange$.subscribe((result) => {
      if (result.key === 'confirmedCanonicalEvidenceTypes')
        this.confirmedCanonicalEvidenceTypes = result.value;
    });
  }
}
