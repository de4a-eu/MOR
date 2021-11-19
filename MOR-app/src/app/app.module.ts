import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EntryPageComponent } from './components/entry-page/entry-page.component';

@NgModule({
  declarations: [
    EntryPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [EntryPageComponent]
})
export class AppModule { }
