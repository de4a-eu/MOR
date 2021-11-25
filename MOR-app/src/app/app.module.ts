import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { MORComponent } from './components/mor/mor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    EntryPageComponent,
    MORComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
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