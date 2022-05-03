import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import {
  faEye,
  faEyeSlash,
  faFileCode,
  faSignInAlt,
  faCheckCircle,
  faTimesCircle,
  faSyncAlt,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

declare var bootstrap: any;

@Component({
  selector: 'app-mor-er',
  templateUrl: './mor-er.component.html',
  styleUrls: ['./mor-er.component.css'],
})
export class MORERComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faFileCode = faFileCode;
  faSignInAlt = faSignInAlt;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faSyncAlt = faSyncAlt;
  faExclamationTriangle = faExclamationTriangle;

  public modalPreview: any;

  @Input('defaultLang') defaultLanguage!: string;
  public selectedLanguage!: string;
  @Input('requesterCountryCode') requesterCountry!: string;
  @Input('canonicalEvidenceTypes') canonicalEvidenceTypes!: string;
  @Input('outputJSArrayId') outputJSArrayId!: string;
  public showDescription: boolean = true;

  constructor(
    public dataLoader: DataLoaderService,
    private storage: StorageService,
    public translate: TranslateService
  ) {
    translate.addLangs(this.dataLoader.getTranslationLanguages());
    translate.setDefaultLang(this.dataLoader.getTranslationDefaultLanguage());
    translate.use(this.dataLoader.getTranslationDefaultLanguage());
  }

  public canonicalEvidenceCountries: any = {};
  public retrievalType: any = {}; // By request (provision) or upload
  public provisions: any = {}; // Provisions
  public uploads: any = {}; // Content of uploaded files

  public selectedEvidenceType!: string;

  public modalSelectProvision: any;
  public modalSelectProvisionData: any = {
    canonicalEvidenceType: '',
    morId: '',
    canonicalEvidenceTypeName: '',
    country: '',
  };

  public complete: boolean = false; // ER is complete

  public inputParametersOK(): boolean {
    if (
      this.defaultLanguage &&
      this.requesterCountry &&
      this.canonicalEvidenceTypes &&
      this.outputJSArrayId
    )
      return true;
    else return false;
  }

  /**
   * When all countries of canonical evidences are selected,
   * including the provisions or upload is selected
   *
   * @returns true if use can proceed with explicit request
   */
  public canProceedWithExplicitRequest(): boolean {
    let nAll = Object.keys(this.retrievalType).length;
    let nOK = 0;
    Object.keys(this.retrievalType).map((type) => {
      if (this.retrievalType[type] == 'upload') {
        if (this.uploads[type]) nOK++;
      } else if (this.retrievalType[type] == 'request') {
        if (this.provisions[type]) {
          let ps = this.provisions[type].provisions;
          if (ps) {
            if (ps.length == 1) nOK++;
            else if (ps.length > 1) {
              ps.map((p: any) => {
                if (p.selected) nOK++;
              });
            }
          }
        }
      }
    });
    return nOK == nAll;
  }

  /**
   * Create output of explicit request
   */
  public finishExplicitRequest() {
    let result: any[] = [];
    Object.keys(this.retrievalType).map((type) => {
      if (this.retrievalType[type] == 'upload') {
        let uploadClean = this.uploads[type].replace(/\n\s*/g, '');
        result.push({
          canonicalEvidenceType: type,
          uploadedDocument: uploadClean,
        });
      } else if (this.retrievalType[type] == 'request') {
        if (this.provisions[type].provisions.length == 1) {
          result.push({
            canonicalEvidenceType: type,
            provision: this.provisions[type].provisions[0],
          });
        } else if (this.provisions[type].provisions.length > 1) {
          result.push({
            canonicalEvidenceType: type,
            provision: this.provisions[type].provisions.find(
              (x: any) => x.selected
            ),
          });
        }
      }
    });
    this.storage.addArray(this.outputJSArrayId, result);
    this.complete = true;

    this.setInputParameterToPreview();
  }

  /**
   * Set input parameter to preview (for demo purposes).
   * Content of uploaded evidence is simply forwarded, while payload is
   * retrieved from provision data. Currently only 1 sample evidence is
   * returned (TO-DO API mock-up).
   */
  public async setInputParameterToPreview() {
    let outputER = JSON.parse(this.storage.get(this.outputJSArrayId));
    for (let i = 0; i < outputER.length; i++) {
      let x = outputER[i];
      if (Object.keys(x).includes('provision')) {
        x.payload = await this.dataLoader.loadXml(
          x.canonicalEvidenceType + '.xml',
          'examples'
        );
        x.payload = x.payload.replace(/\n\s*/g, '');
        delete x.provision;
      }
    }
    this.storage.addArray('inputPreview', outputER);
  }

  /**
   * Get all canonical evidence types
   *
   * @returns array of canonical evidence types with `name`, `code` and
   *          `tokenName`
   */
  public getEvidenceTypes(): CanonicalEvidenceType[] {
    return this.dataLoader.getSelectedCanonicalEvidenceTypes(
      this.canonicalEvidenceTypes
    );
  }

  public previewEvidence(tokenName: string | undefined) {
    if (tokenName) {
      this.selectedEvidenceType = tokenName;
      this.modalPreview.show();
    }
  }

  public getEvidenceTypeNameForPreview(): string {
    let selectedEvidence = this.getEvidenceTypes().find(
      (x) => x.tokenName == this.selectedEvidenceType
    );
    if (selectedEvidence) return selectedEvidence.name;
    else return '';
  }

  public getEvidenceTypeContentForPreview(): string {
    let selectedEvidence = this.getEvidenceTypes().find(
      (x) => x.tokenName == this.selectedEvidenceType
    );
    let content = '';
    if (selectedEvidence && selectedEvidence.tokenName)
      content = selectedEvidence.tokenName;
    return content;
  }

  /**
   * Get evidence types that are included in explicit request
   * (user has selected country and provision)
   *
   * @returns array of canonical evidence types with `name`, `code` and
   *          `tokenName` that are included in the explicit request
   */
  public getEvidenceTypesForRequest(): CanonicalEvidenceType[] {
    return this.getEvidenceTypes().filter((evidenceType) => {
      let retrievalType = this.retrievalType[evidenceType.tokenName || ''];
      let provision = this.provisions[evidenceType.tokenName || ''];
      return retrievalType == 'request' && typeof provision == 'object';
    });
  }

  /**
   * Get evidence types that are uploaded by the user
   *
   * @returns array of canonical evidence types with `name`, `code` and
   *          `tokenName` that are uploaded
   */
  public getEvidenceTypesForUpload(): CanonicalEvidenceType[] {
    return this.getEvidenceTypes().filter((evidenceType) => {
      let retrievalType = this.retrievalType[evidenceType.tokenName || ''];
      let upload = this.uploads[evidenceType.tokenName || ''];
      return retrievalType == 'upload' && typeof upload == 'string';
    });
  }

  /**
   * Get IAL provisions (Intermediation Pattern (IP))
   *
   * @param canonicalEvidenceTypeId `tokenName` of canonical evidence type
   * @param countryCode country code (e.g. `SI`)
   * @returns array with provision details
   */
  public getIalIP(canonicalEvidenceTypeId: string, countryCode: string): any {
    let result = this.dataLoader.getIal(
      canonicalEvidenceTypeId,
      countryCode,
      'IP'
    );
    return result;
  }

  /**
   * Request provisions for given canonical evidence type and optionaly display
   * modal window for user selection of specific provision if multiple exist.
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @param showModal show modal window for specific provision selection
   */
  public requestProvision(
    canonicalEvidenceType: string,
    showModal: boolean = true
  ): void {
    let country = this.canonicalEvidenceCountries[canonicalEvidenceType];
    let provisions = this.getIalIP(canonicalEvidenceType, country);
    if (provisions == null) provisions = 'not available';
    this.provisions[canonicalEvidenceType] = provisions;
    if (typeof provisions == 'object' && provisions.provisions.length > 1) {
      let type = this.getEvidenceTypesForRequest().find(
        (x) => x.tokenName == canonicalEvidenceType
      );
      this.modalSelectProvisionData.canonicalEvidenceType =
        canonicalEvidenceType;
      this.modalSelectProvisionData.morId = type ? type.morID : '';
      this.modalSelectProvisionData.canonicalEvidenceName = type
        ? type.name
        : '';
      this.modalSelectProvisionData.country =
        this.dataLoader.getCountryName(country);
      if (showModal) this.modalSelectProvision.show();
    }
  }

  /**
   * Request all provision, where country is selected, but don't display modal
   * window to user for selection of provision if multiple exist
   */
  public requestProvisions(): void {
    for (let canonicalEvidenceType in this.canonicalEvidenceCountries) {
      this.requestProvision(canonicalEvidenceType, false);
    }
  }

  /**
   * When multiple provisions are returned, user selects 1
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @param iProvision sequence number of selected provision
   */
  public selectProvision(
    canonicalEvidenceType: string,
    iProvision: number
  ): void {
    for (
      let i = 0;
      i < this.provisions[canonicalEvidenceType].provisions.length;
      i++
    )
      this.provisions[canonicalEvidenceType].provisions[i].selected =
        i == iProvision;
  }

  /**
   * Get a list of possible provision per selected canonical evidence type
   * (displayed to a user in a modal window)
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @returns array of provisions
   */
  public getProvisions(canonicalEvidenceType: string): any[] {
    let provision = this.provisions[canonicalEvidenceType];
    if (!provision) {
      return [];
    } else if (typeof provision == 'string' && provision == 'not available') {
      return [];
    } else if (typeof provision == 'object') {
      return provision.provisions;
    } else {
      return [];
    }
  }

  /**
   * Display (selected) provision next to selected country
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @returns label of selected provision or message to select 1 provision
   */
  public displayProvision(canonicalEvidenceType: string): any {
    let provision = this.provisions[canonicalEvidenceType];
    if (!provision) {
      return null;
    } else if (typeof provision == 'string' && provision == 'not available') {
      return this.translate.instant(
        'GUI/provisionNotAvailable.' + this.selectedLanguage + '.label'
      );
    } else if (typeof provision == 'object') {
      if (provision.provisions.length > 1) {
        for (let i = 0; i < provision.provisions.length; i++) {
          if (provision.provisions[i].selected)
            return provision.provisions[i].dataOwnerPrefLabel;
        }
        return this.translate.instant(
          'GUI/select1Provision.' + this.selectedLanguage + '.label'
        );
      } else {
        return provision.provisions[0].dataOwnerPrefLabel;
      }
    }
  }

  /**
   * Toggle retrieval type for given canonical evidence type
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence type
   * @param type retrieval type (`request` or `upload`)
   */
  public toggleRetrievalType(
    canonicalEvidenceType: string,
    type: string
  ): void {
    this.retrievalType[canonicalEvidenceType] = type;
    delete this.canonicalEvidenceCountries[canonicalEvidenceType];
    delete this.provisions[canonicalEvidenceType];
    delete this.uploads[canonicalEvidenceType];
  }

  /**
   * Upload text document with canonical evidence
   *
   * @param canonicalEvidenceType `tokenName` of canonical evidence
   * @param input file upload content
   */
  public handleUpload(canonicalEvidenceType: string, input: any) {
    if (canonicalEvidenceType && input.files && input.files.length > 0) {
      let reader = new FileReader();
      reader.addEventListener('load', (result) => {
        if (result.target)
          this.uploads[canonicalEvidenceType] = result.target.result;
      });
      reader.readAsText(input.files[0], 'UTF-8');
    }
  }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
    this.storage.remove(this.outputJSArrayId);
    this.storage.remove('inputPreview');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getEvidenceTypes().map((x) => {
      this.retrievalType[x.tokenName || ''] = 'request';
    });
    if (changes['defaultLanguage']) {
      this.selectedLanguage = this.defaultLanguage;
      this.translate.use(this.selectedLanguage);
    }
  }

  ngAfterViewInit(): void {
    // Enable Bootstrap tooltip
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((element) => new bootstrap.Tooltip(element));
    // Bootstrap modals
    this.modalSelectProvision = new bootstrap.Modal(
      document.getElementById('selectProvisionModal')
    );
    // Bootstrap modals
    this.modalPreview = new bootstrap.Modal(
      document.getElementById('previewEvidenceSchemaModal')
    );
  }
}
