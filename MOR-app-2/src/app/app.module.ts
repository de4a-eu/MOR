import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { CountrySelectorComponent } from "./components/country-selector/country-selector.component";
import { LanguageSelectorComponent } from "./components/language-selector/language-selector.component";
import { MORERComponent } from "./components/mor-er/mor-er.component";
import { PreviewXmlComponent } from "./components/preview-xml/preview-xml.component";
import { URL } from "./classes/settings";
import { MORPComponent } from "./components/mor-p/mor-p.component";

@NgModule({
  declarations: [
    CountrySelectorComponent,
    LanguageSelectorComponent,
    PreviewXmlComponent,
    MORERComponent,
    MORPComponent,
  ],
  imports: [
    BrowserModule,
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
  bootstrap: [MORERComponent, MORPComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, URL.i18n);
}
