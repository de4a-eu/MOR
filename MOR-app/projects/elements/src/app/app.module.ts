import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { createCustomElement } from '@angular/elements';

import { MORERComponent } from 'src/app/components/mor-er/mor-er.component';
import { MorPComponent } from 'src/app/components/mor-p/mor-p.component';
import { LanguageSelectorComponent } from 'src/app/components/language-selector/language-selector.component';
import { CountrySelectorComponent } from 'src/app/components/country-selector/country-selector.component';
import { PreviewXmlComponent } from 'src/app/components/preview-xml/preview-xml.component';

@NgModule({
  declarations: [
    MORERComponent,
    MorPComponent,
    LanguageSelectorComponent,
    CountrySelectorComponent,
    PreviewXmlComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    /*customElements.define(
      'de4a-country-selector',
      createCustomElement(CountrySelectorComponent, {
        injector: this.injector,
      })
    );
    customElements.define(
      'de4a-language-selector',
      createCustomElement(LanguageSelectorComponent, {
        injector: this.injector,
      })
    );*/
    customElements.define(
      'de4a-mor-er',
      createCustomElement(MORERComponent, {
        injector: this.injector,
      })
    );
    customElements.define(
      'de4a-mor-p',
      createCustomElement(MorPComponent, {
        injector: this.injector,
      })
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
  /*return new TranslateHttpLoader(
    http,
    'https://raw.githubusercontent.com/de4a-wp3/MOR/main/MOR-app/src/assets/i18n/'
  );*/
}
