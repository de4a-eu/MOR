import { Component, OnInit, Input } from '@angular/core';
import { DataLoaderXmlService } from 'src/app/services/data-loader-xml.service';

@Component({
  selector: 'app-mor-p',
  templateUrl: './mor-p.component.html',
  styleUrls: ['./mor-p.component.css'],
})
export class MorPComponent implements OnInit {
  public BirthCertificateExample: string = '';

  @Input('defaultLang') defaultLanguage!: string;
  public selectedLanguage!: string;
  public showDescription: boolean = true;

  constructor(private dataLoaderXml: DataLoaderXmlService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
    this.dataLoaderXml
      .loadXml('BirthCertificate.xml', 'examples')
      .then((result) => (this.BirthCertificateExample = result));
  }
}
