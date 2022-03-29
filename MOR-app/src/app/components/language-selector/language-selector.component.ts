import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataLoaderLanguagesService } from 'src/app/services/data-loader-languages.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/classes/language';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css'],
})
export class LanguageSelectorComponent implements OnInit {
  @Input('selectedLanguage') selectedLanguage!: string;
  @Output() selectedLanguageChange = new EventEmitter();

  constructor(
    public languages: DataLoaderLanguagesService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'sl', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public getLanguageName(code: string): string | null {
    let language = this.languages.getLanguages().find((x) => code == x.code);
    let name: string | null = null;
    if (language)
      name = this.translate.instant('term.LangEnum/' + language.code).label;
    return name;
  }

  public getLanguages(): Language[] {
    let languages = this.languages.getLanguages();
    languages.map((x) => {
      x.name = this.translate.instant('term.LangEnum/' + x.code).label;
    });
    return languages;
  }

  public getLanguageFlagCode(code: string): string | null {
    let language = this.languages.getLanguages().find((x) => code == x.code);
    return language ? language.flagCode : null;
  }

  public setLanguage(code: string) {
    this.selectedLanguage = code;
    this.selectedLanguageChange.emit(code);
    this.translate.use(code);
  }

  ngOnInit(): void {}
}
