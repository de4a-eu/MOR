import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { XMLParser } from "fast-xml-parser";
import { URL } from "../../classes/settings";

@Component({
  selector: "de4a-preview-xml",
  template: `<p [innerHTML]="jsOutputTranslated"></p>`,
})
export class PreviewXmlComponent implements OnInit {
  @Input("lang") lang!: string;
  @Input("showDescriptions") showDescription: boolean = false;
  @Input("evidenceType") evidenceType!: string;
  @Input("xmlInput") xmlInput!: string;

  public parser = new XMLParser();

  public jsOutput: any;
  public jsOutputDetails: any[] = [];
  public jsOutputTranslated?: string;

  private schemaOnly: boolean = true;
  private schemaExamples: any = {};

  constructor(
    private dataLoader: DataLoaderService,
    private translate: TranslateService
  ) {
    /**
     * Load schema examples
     */
    for (const type in URL.schemaExamples) {
      this.dataLoader
        .loadXml(URL.schemas + URL.schemaExamples[type])
        .subscribe((response) => {
          this.schemaExamples[type] = response;
        });
    }

    /**
     * Asynchronous translation on language change
     */
    this.translate.onLangChange.subscribe(() => {
      this.translateDocument();
    });
  }

  private translateDocument(): void {
    /**
     * Only translate when the language is set
     */
    if (
      this.translate.store.translations[this.dataLoader.selectedLanguage] !=
      undefined
    ) {
      this.jsOutputDetails = this.getAllKeysAndValues();
      this.jsOutputDetails.map((x) => {
        x.translate = this.findAndTranslateKey(
          x.fullKey,
          this.translate.store.translations[this.dataLoader.selectedLanguage]
        );
      });

      this.prettyPrint();
    }
  }

  private findAndTranslateKey = (inKey: string, allTranslations: any): any => {
    let outKey: any = {};
    // Try to find exact match of key in translations
    let translation = allTranslations[inKey];
    if (translation) {
      outKey = {
        key: inKey,
        label: translation[this.dataLoader.selectedLanguage]["label"],
        description:
          translation[this.dataLoader.selectedLanguage]["description"],
        verified:
          translation[this.dataLoader.selectedLanguage]["verified"] == "true",
      };
    } else {
      let complete = true;
      do {
        // Split path into parts
        let parts = inKey.split("/");
        // Search for longest match (excluding last part)
        for (let i = parts.length - 2; i >= 0; i--) {
          let newPart = parts.slice(0, i + 1).join("/");
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
            label: translation[this.dataLoader.selectedLanguage]["label"],
            description:
              translation[this.dataLoader.selectedLanguage]["description"],
            verified:
              translation[this.dataLoader.selectedLanguage]["verified"] ==
              "true",
          };
        }
      } while (!complete);
    }
    return outKey;
  };

  private prettyPrint = () => {
    const tab = 5;
    this.jsOutputTranslated = "";
    this.jsOutputDetails.map((v) => {
      this.jsOutputTranslated +=
        "<div class='d-flex flex-row'>" +
        ("<div>" + "&nbsp;".repeat(tab * (v.level - 1)) + "</div>") +
        "<div><b>" +
        (v.translate && v.translate.label ? v.translate.label : v.key) +
        "</b>" +
        (!this.schemaOnly
          ? v.value
            ? ': <code class="fw-bold de4a-schema-values">' + v.value + "</code>"
            : ""
          : "") +
        (v.translate && v.translate.description && this.showDescription
          ? "<i><small class='de4a-schema-comment'><span class='ms-2 me-2'>&larr;</span>" +
            v.translate.description +
            "</small></i>"
          : "") +
        "</div>" +
        "</div>";
    });
  };

  private getAllKeysAndValues = (obj: any = this.jsOutput) => {
    let result: any[] = [];
    function traverse(o: any, level: number, path = "") {
      for (let k in o) {
        let shortKey = k.replace(/(n3|cvb|cbc):/g, "");
        let fullKey = (path.length > 0 ? path + "/" : "") + shortKey;
        if (typeof o[k] == "object" && o[k].length > 0) {
          for (let i = 0; i < o[k].length; i++) {
            result.push({ key: shortKey, fullKey: fullKey, level: level });
            traverse(o[k][i], level + 1, fullKey);
          }
        } else if (typeof o[k] == "object") {
          result.push({ key: shortKey, fullKey: fullKey, level: level });
          traverse(o[k], level + 1, fullKey);
        } else if (o[k] != null && o[k] != "") {
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

  ngOnChanges(changes: SimpleChanges) {
    this.schemaOnly = this.evidenceType != undefined;
    if (!this.xmlInput) this.xmlInput = this.schemaExamples[this.evidenceType];
    if (this.xmlInput) {
      this.jsOutput = this.parser.parse(this.xmlInput);
      if (Object.keys(this.jsOutput).length > 0) this.translateDocument();
    }
  }

  ngOnInit(): void {}
}
