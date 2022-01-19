import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { MORComponent } from './components/mor/mor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MORERComponent } from './components/mor-er/mor-er.component';
import { MorPComponent } from './components/mor-p/mor-p.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { InputParametersMorErSelectorComponent } from './components/input-parameters-mor-er-selector/input-parameters-mor-er-selector.component';
import { CountrySelectorComponent } from './components/country-selector/country-selector.component';
import { CanonicalEvidenceTypeSelectorComponent } from './components/canonical-evidence-type-selector/canonical-evidence-type-selector.component';
import { SourceCodeMorErIncludeComponent } from './components/source-code-mor-er-include/source-code-mor-er-include.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EntryPageComponent,
    MORComponent,
    MORERComponent,
    MorPComponent,
    LanguageSelectorComponent,
    InputParametersMorErSelectorComponent,
    CountrySelectorComponent,
    CanonicalEvidenceTypeSelectorComponent,
    SourceCodeMorErIncludeComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [EntryPageComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}