import { Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { createCustomElement } from "@angular/elements";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CountrySelectorComponent } from "src/app/components/country-selector/country-selector.component";
import { MORERComponent } from "src/app/components/mor-er/mor-er.component";
import { MORPComponent } from "src/app/components/mor-p/mor-p.component";
import { LanguageSelectorComponent } from "src/app/components/language-selector/language-selector.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { URL } from "../../../../src/app/classes/settings";
import { PreviewXmlComponent } from "src/app/components/preview-xml/preview-xml.component";

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
  bootstrap: [],
})
export class ComponentModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    customElements.define(
      "de4a-mor-er",
      createCustomElement(MORERComponent, { injector: this.injector })
    );
    customElements.define(
      "de4a-mor-p",
      createCustomElement(MORPComponent, { injector: this.injector })
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, URL.i18n);
}
