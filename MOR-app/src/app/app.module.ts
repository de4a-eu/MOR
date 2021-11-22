import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EntryPageComponent } from './components/entry-page/entry-page.component';
import { MORComponent } from './components/mor/mor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    EntryPageComponent,
    MORComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [EntryPageComponent]
})
export class AppModule { }
