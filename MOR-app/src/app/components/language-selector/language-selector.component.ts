import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';
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
    public dataLoader: DataLoaderService,
    public translate: TranslateService
  ) {
    translate.addLangs(this.dataLoader.getTranslationLanguages());
    translate.setDefaultLang(this.dataLoader.getTranslationDefaultLanguage());
    translate.use(this.dataLoader.getTranslationDefaultLanguage());
  }

  public getLanguageName(code: string): string | null {
    let language = this.dataLoader.getLanguages().find((x) => code == x.code);
    let name: string | null = null;
    if (language)
      name = this.translate.instant(
        'LangEnum/' + language.code + '.' + this.selectedLanguage + '.label'
      );
    return name;
  }

  public getLanguages(): Language[] {
    let languages = this.dataLoader.getLanguages();
    languages.map((x) => {
      x.name = this.translate.instant(
        'LangEnum/' + x.code + '.' + this.selectedLanguage + '.label'
      );
    });
    return languages;
  }

  public getLanguageFlagCode(code: string): string | null {
    let language = this.dataLoader.getLanguages().find((x) => code == x.code);
    return language ? language.flagCode : null;
  }

  public setLanguage(code: string) {
    this.selectedLanguage = code;
    this.selectedLanguageChange.emit(code);
    this.translate.use(code);
  }

  ngOnInit(): void {}
}
