import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mor-p',
  templateUrl: './mor-p.component.html',
  styleUrls: ['./mor-p.component.css']
})
export class MorPComponent implements OnInit {

  @Input('defaultLang') defaultLanguage!: string;
  public selectedLanguage!: string;

  constructor() { }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
  }

}
