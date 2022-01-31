import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { XMLParser } from 'fast-xml-parser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-preview-xml',
  templateUrl: './preview-xml.component.html',
  styleUrls: ['./preview-xml.component.css'],
})
export class PreviewXmlComponent implements OnInit {
  faSearch = faSearch;

  @Input('lang') lang!: string;

  public parser = new XMLParser();

  public xmlInput?: string;
  public jsOutput?: any;
  public jsOutputString?: string;

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'sl', 'es']);
    translate.setDefaultLang('en');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lang']) this.translate.use(this.lang);
  }

  ngOnInit(): void {
    this.xmlInput =
      '<BirthEvidence><Child><GivenName>Lisa</GivenName><FamilyName>Simpson</FamilyName><Gender>Female</Gender><BirthDate>20/02/2002</BirthDate><PlaceOfBirth><geographicIdentifier></geographicIdentifier><geographicName>Springfield, Earth</geographicName></PlaceOfBirth></Child><Parent1><GivenName>Homer</GivenName><FamilyName>Simpson</FamilyName></Parent1><Parent2><GivenName>Marge</GivenName><FamilyName>Simpson</FamilyName></Parent2></BirthEvidence>';

    this.jsOutput = this.parser.parse(this.xmlInput);
    this.jsOutputString = JSON.stringify(this.jsOutput, null, 2);
  }
}
