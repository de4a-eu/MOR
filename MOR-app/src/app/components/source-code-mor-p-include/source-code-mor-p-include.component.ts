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
import { DataLoaderStorageService } from 'src/app/services/data-loader-storage.service';

@Component({
  selector: 'app-source-code-mor-p-include',
  templateUrl: './source-code-mor-p-include.component.html',
  styleUrls: ['./source-code-mor-p-include.component.css']
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

  public isDisplayed: boolean = true;

  constructor(private dataLoaderStorage: DataLoaderStorageService) { }

  public getOutput(): string {
    let output = this.dataLoaderStorage.get(this.postActionValue);
    output = output.length == 0 ? "[]" : output.replace(/\n/g, "");
    return output;
  }

  ngOnInit(): void {
  }

}
