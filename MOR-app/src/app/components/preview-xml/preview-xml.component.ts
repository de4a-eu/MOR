import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { XMLParser } from 'fast-xml-parser';
import { TranslateService } from '@ngx-translate/core';
import { DataLoaderXmlService } from 'src/app/services/data-loader-xml.service';

@Component({
  selector: 'app-preview-xml',
  templateUrl: './preview-xml.component.html',
  styleUrls: ['./preview-xml.component.css'],
})
export class PreviewXmlComponent implements OnInit {
  faSearch = faSearch;

  @Input('lang') lang!: string;
  @Input('xmlInput') xmlInput!: string;
  @Input('showDescriptions') showDescription: boolean = false;

  public parser = new XMLParser();

  public jsOutput: any;
  public jsOutputDetails: any[] = [];
  public jsOutputTranslated?: string;

  public output: any;
  private examples: any = {};
  private schemaOnly: boolean = false;

  constructor(
    public translate: TranslateService,
    private dataLoaderXml: DataLoaderXmlService
  ) {
    translate.addLangs(['en', 'sl', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');

    dataLoaderXml
      .loadXml('birth-evidence-1.7-generated-example.xml', 'examples')
      .then((data) => (this.examples['BirthCertificate'] = data));
    dataLoaderXml
      .loadXml('marriage-evidence-1.7-generated-example.xml', 'examples')
      .then((data) => (this.examples['MarriageCertificate'] = data));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lang']) this.translate.use(this.lang);
    if (changes['xmlInput']) {
      if (Object.keys(this.examples).includes(this.xmlInput)) {
        this.schemaOnly = true;
        this.xmlInput = this.examples[this.xmlInput];
      }
      this.jsOutput = this.parser.parse(this.xmlInput);
    }
    if (Object.keys(this.jsOutput).length > 0) this.translateDocument();
  }

  private translateDocument(): void {
    this.jsOutputDetails = this.getAllKeysAndValues();

    // All available translations in case full match is not found
    let transCurrentLanguage = Object.keys(
      this.translate.store.translations
    )[0];
    let transKeys = Object.keys(
      this.translate.store.translations[transCurrentLanguage]['term']
    );

    let fullKeys = this.jsOutputDetails.map((x) => 'term.' + x.fullKey);
    this.translate.get(fullKeys).subscribe((translations) => {
      fullKeys.map((fullKey) => {
        if (
          typeof translations[fullKey] == 'object' &&
          translations[fullKey].label
        ) {
          let foundKey = this.jsOutputDetails.find(
            (x) => x.fullKey == fullKey.replace('term.', '')
          );
          if (translations[fullKey].label)
            foundKey.keyLabelTranslation = translations[fullKey].label;
          if (translations[fullKey].description) {
            foundKey.keyDescriptionTranslation =
              translations[fullKey].description;
          }
        } else {
          let potencial = transKeys.filter((x) => fullKey.endsWith(x));
          if (potencial.length > 0) {
            let potencialLength = potencial.map((x) => x.length);
            let fullKeyNew =
              potencial[potencialLength.indexOf(Math.max(...potencialLength))];
            let foundKey = this.jsOutputDetails.find(
              (x) => x.fullKey == fullKey.replace('term.', '')
            );
            let potentialTranslation = this.translate.instant(
              'term.' + fullKeyNew
            );
            foundKey.keyLabelTranslation = potentialTranslation.label;
            foundKey.keyDescriptionTranslation =
              potentialTranslation.description;
          } else {
            //console.log("Missing translation for " + fullKey.replace("term.", ""));
          }
        }
      });
      this.prettyPrint();
    });
  }

  private prettyPrint = () => {
    const tab = 5;
    this.jsOutputTranslated = '';
    this.jsOutputDetails.map((v) => {
      this.jsOutputTranslated +=
        "<div class='d-flex flex-row'>" +
        ('<div>' + '&nbsp;'.repeat(tab * (v.level - 1)) + '</div>') +
        '<div><b>' +
        (v.keyLabelTranslation ? v.keyLabelTranslation : v.key) +
        '</b>' +
        (!this.schemaOnly
          ? v.value
            ? ': <code class="text-primary fw-bold">' + v.value + '</code>'
            : ''
          : '') +
        (v.keyDescriptionTranslation
          ? "</div><i><small class='text-muted " +
            (!this.showDescription ? 'd-none' : '') +
            "'><span class='ms-2 me-2'>&larr;</span>" +
            v.keyDescriptionTranslation +
            '</small></i>'
          : '') +
        '</div>' +
        '</div>';
    });
  };

  private getAllKeysAndValues = (obj: any = this.jsOutput) => {
    let result: any[] = [];
    function traverse(o: any, level: number, path = '') {
      for (let k in o) {
        let shortKey = k.replace(/(n3|cvb|cbc):/g, '');
        let fullKey = (path.length > 0 ? path + '/' : '') + shortKey;
        if (typeof o[k] == 'object' && o[k].length > 0) {
          for (let i = 0; i < o[k].length; i++) {
            result.push({ key: shortKey, fullKey: fullKey, level: level });
            traverse(o[k][i], level + 1, fullKey);
          }
        } else if (typeof o[k] == 'object') {
          result.push({ key: shortKey, fullKey: fullKey, level: level });
          traverse(o[k], level + 1, fullKey);
        } else if (o[k] != null && o[k] != '') {
          result.push({
            key: shortKey,
            fullKey: fullKey,
            value: o[k],
            level: level,
          });
        }
      }
    }
    traverse(obj, 1);

    return result;
  };

  ngOnInit(): void {}
}
