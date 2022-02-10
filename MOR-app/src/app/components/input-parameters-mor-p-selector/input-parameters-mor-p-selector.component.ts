import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  faSignInAlt,
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-parameters-mor-p-selector',
  templateUrl: './input-parameters-mor-p-selector.component.html',
  styleUrls: ['./input-parameters-mor-p-selector.component.css'],
})
export class InputParametersMorPSelectorComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faExclamationCircle = faExclamationCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  public isDisplayed: boolean = true;

  @Input() defaultLanguage: string = 'sl';
  @Input() postActionValue!: string;
  @Output() defaultLanguageChange = new EventEmitter<string>();
  updateDefaultLanguage() {
    this.defaultLanguageChange.emit(this.defaultLanguage);
  }

  @Output() postActionValueChange = new EventEmitter<string>();
  updatePostActionValue() {
    this.postActionValueChange.emit(this.postActionValue);
  }

  ngOnInit(): void {}
}
