import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CanonicalEvidenceType } from 'src/app/classes/canonical-evidence-type';
import { DataLoaderCanonicalEvidenceTypesService } from 'src/app/services/data-loader-canonical-evidence-types.service';
import { DataLoaderStorageService } from 'src/app/services/data-loader-storage.service';
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
  faExclamationTriangle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

declare var bootstrap: any;

@Component({
  selector: 'app-mor-p',
  templateUrl: './mor-p.component.html',
  styleUrls: ['./mor-p.component.css'],
})
export class MorPComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSignInAlt = faSignInAlt;
  faExclamationTriangle = faExclamationTriangle;
  faCheckCircle = faCheckCircle;

  public modalPreview: any;

  @Input('defaultLang') defaultLanguage!: string;
  @Input('postActionValue') postActionValue!: string;
  private postActionValueObject: any[] = [];
  public selectedLanguage!: string;
  public selectedEvidenceType!: string;
  public showDescription: boolean = true;

  public confirmSendStatus: any = {};
  public complete: boolean = false; // P is complete

  constructor(
    private dataLoaderCanonicalEvidenceTypes: DataLoaderCanonicalEvidenceTypesService,
    private dataLoaderStorage: DataLoaderStorageService
  ) {}

  public inputParametersOK(): boolean {
    if (this.defaultLanguage && this.postActionValueObject.length > 0)
      return true;
    else return false;
  }

  /**
   * Get evidence types for preview
   *
   * @returns array of evidence types with `name`, `code` and `tokenName`
   */
  public getEvidenceTypes(): CanonicalEvidenceType[] {
    let selectedTokenNames = this.postActionValueObject.map(
      (x) => x.canonicalEvidenceType
    );
    let types = this.dataLoaderCanonicalEvidenceTypes
      .getAllCanonicalEvidenceTypes()
      .filter((x) => selectedTokenNames.includes(x.tokenName));
    return types;
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
    if (selectedEvidence)
      content = this.getEvidenceByType(selectedEvidence.tokenName || '') || '';
    return content;
  }

  /**
   * Checks if content of evidence is available
   *
   * @param tokenName canonical evidence type
   * @returns content of canonical evidence
   */
  public isEvidenceAvailable(tokenName: string | undefined): boolean {
    let result = false;
    if (tokenName) {
      let input = this.postActionValueObject.find(
        (x) => x.canonicalEvidenceType == tokenName
      );
      if (input && (input.uploadedDocument || input.payload)) result = true;
    }
    return result;
  }

  /**
   * Get content of canonical evidence
   *
   * @param tokenName canonical evidence type
   * @returns content of canonical evidence
   */
  public getEvidenceByType(tokenName: string): string | null {
    if (!this.isEvidenceAvailable(tokenName)) return null;
    let postActionValue = this.postActionValueObject.find(
      (x) => x.canonicalEvidenceType == tokenName
    );
    return postActionValue.uploadedDocument
      ? postActionValue.uploadedDocument
      : postActionValue.payload;
  }

  public previewEvidence(tokenName: string | undefined) {
    if (tokenName) {
      this.selectedEvidenceType = tokenName;
      this.modalPreview.show();
    }
  }

  public finishPreview() {
    this.dataLoaderStorage.addArray(
      'confirmedCanonicalEvidenceTypes',
      this.confirmSendStatus
    );
    this.complete = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultLanguage'])
      this.selectedLanguage = this.defaultLanguage;
    if (changes['postActionValue']) {
      this.postActionValueObject = JSON.parse(this.postActionValue);
      this.postActionValueObject.map(
        (x) => (this.confirmSendStatus[x.canonicalEvidenceType] = false)
      );
    }
  }

  ngOnInit(): void {
    this.selectedLanguage = this.defaultLanguage;
    this.dataLoaderStorage.remove('confirmedCanonicalEvidenceTypes');

    // Bootstrap modals
    this.modalPreview = new bootstrap.Modal(
      document.getElementById('previewEvidenceModal')
    );
  }
}
