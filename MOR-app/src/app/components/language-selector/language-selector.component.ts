import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataLoaderLanguagesService } from 'src/app/services/data-loader-languages.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements OnInit {
  @Input('selectedLanguage') selectedLanguage!: string;
  @Output() selectedLanguageChange = new EventEmitter();

  constructor(public languages: DataLoaderLanguagesService) {}

  public getLanguageName(code: string): string | null {
    let language = this.languages.getLanguages().find((x) => code == x.code);
    return language ? language.name : null;
  }

  public getLanguageFlagCode(code: string): string | null {
    let language = this.languages.getLanguages().find((x) => code == x.code);
    return language ? language.flagCode : null;
  }

  public setLanguage(code: string) {
    this.selectedLanguage = code;
    this.selectedLanguageChange.emit(code);
  }

  ngOnInit(): void {}
}
