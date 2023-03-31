/*
 * Copyright (C) 2023, Partners of the EU funded DE4A project consortium
 * (https://www.de4a.eu/consortium), under Grant Agreement No.870635
 * Author: Dejan Lavbič (www.lavbic.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
