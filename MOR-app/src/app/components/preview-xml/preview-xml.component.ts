import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { XMLParser } from 'fast-xml-parser';
import { TranslateService } from '@ngx-translate/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';

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
    private dataLoader: DataLoaderService
  ) {
    translate.addLangs(this.dataLoader.getTranslationLanguages());
    translate.setDefaultLang(this.dataLoader.getTranslationDefaultLanguage());
    translate.use(this.dataLoader.getTranslationDefaultLanguage());

    this.dataLoader
      .loadXml('birth-evidence-1.7-generated-example.xml', 'examples')
      .then((data) => (this.examples['BirthCertificate'] = data));
    this.dataLoader
      .loadXml('marriage-evidence-1.7-generated-example.xml', 'examples')
      .then((data) => (this.examples['MarriageCertificate'] = data));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['xmlInput']) {
      if (Object.keys(this.examples).includes(this.xmlInput)) {
        this.schemaOnly = true;
        this.xmlInput = this.examples[this.xmlInput];
      }
      this.jsOutput = this.parser.parse(this.xmlInput);
      if (Object.keys(this.jsOutput).length > 0) this.translateDocument();
    }
    if (changes['lang']) {
      this.translate.use(this.lang).subscribe(() => {
        if (this.jsOutput && Object.keys(this.jsOutput).length > 0)
          this.translateDocument();
      });
    }
    if (changes['showDescription']) {
      if (this.jsOutput && Object.keys(this.jsOutput).length > 0)
          this.translateDocument();
    }
  }

  private findAndTranslateKey = (
    inKey: string,
    allKeys: any,
    allTranslations: any
  ): any => {
    let outKey: any = {};
    // Try to find exact match of key in translations
    let translation = allTranslations[inKey];
    if (translation) {
      outKey = {
        key: inKey,
        label: translation[this.lang]['label'],
        description: translation[this.lang]['description'],
        verified: translation[this.lang]['verified'] == 'true',
      };
    } else {
      let complete = true;
      do {
        // Split path into parts
        let parts = inKey.split('/');
        // Search for longest match (excluding last part)
        for (let i = parts.length - 2; i >= 0; i--) {
          let newPart = parts.slice(0, i + 1).join('/');
          if (allTranslations[newPart] && allTranslations[newPart].type) {
            // Replace path with type
            inKey = inKey.replace(newPart, allTranslations[newPart].type);
            complete = false;
            break;
          } else {
            complete = true;
          }
        }
        // Try again to find the translation
        translation = allTranslations[inKey];
        if (translation) {
          outKey = {
            key: inKey,
            label: translation[this.lang]['label'],
            description: translation[this.lang]['description'],
            verified: translation[this.lang]['verified'] == 'true',
          };
        }
      } while (!complete);
    }
    return outKey;
  };

  private translateDocument(): void {
    this.jsOutputDetails = this.getAllKeysAndValues();

    /*this.findAndTranslateKey(
      'BirthEvidence/IssuingAuthority/Identifier/Identifier',
      this.jsOutputDetails,
      this.translate.store.translations[this.lang]
    );*/

    this.jsOutputDetails.map((x) => {
      x.translate = this.findAndTranslateKey(
        x.fullKey,
        this.jsOutputDetails,
        this.translate.store.translations[this.lang]
      );
    });

    this.prettyPrint();
  }

  private prettyPrint = () => {
    const tab = 5;
    this.jsOutputTranslated = '';
    this.jsOutputDetails.map((v) => {
      this.jsOutputTranslated +=
        "<div class='d-flex flex-row'>" +
        ('<div>' + '&nbsp;'.repeat(tab * (v.level - 1)) + '</div>') +
        '<div><b>' +
        (v.translate && v.translate.label ? v.translate.label : v.key) +
        '</b>' +

        (!this.schemaOnly
          ? v.value
            ? ': <code class="text-primary fw-bold">' + v.value + '</code>'
            : ''
          : '') +
        (v.translate && v.translate.description && this.showDescription
          ? "<i><small class='text-muted'><span class='ms-2 me-2'>&larr;</span>" +
            v.translate.description +
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
