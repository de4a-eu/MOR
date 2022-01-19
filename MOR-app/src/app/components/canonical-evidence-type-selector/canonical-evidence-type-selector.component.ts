import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataLoaderCanonicalEvidenceTypesService } from 'src/app/services/data-loader-canonical-evidence-types.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-canonical-evidence-type-selector',
  templateUrl: './canonical-evidence-type-selector.component.html',
  styleUrls: ['./canonical-evidence-type-selector.component.css'],
})
export class CanonicalEvidenceTypeSelectorComponent implements OnInit {
  faMinus = faMinus;
  faPlus = faPlus;

  @Input('selectedTypes') selectedTypes!: string;
  @Output() selectedTypesChange = new EventEmitter();

  constructor(public loader: DataLoaderCanonicalEvidenceTypesService) {}

  public getSelectedTypes = () => {
    return !this.selectedTypes || this.selectedTypes.length == 0
      ? []
      : this.selectedTypes.split(',');
  };

  public getTypeName(code: string): string | null {
    let type = this.loader
      .getCanonicalEvidenceTypes()
      .find((x) => code == x.code);
    return type ? type.name : null;
  }

  public isTypeSelected(tokenName: string | undefined): boolean {
    return !tokenName ? false : this.getSelectedTypes().includes(tokenName);
  }

  public toggleType(tokenName: string | undefined) {
    if (!this.selectedTypes) this.selectedTypes = "";
    if (this.isTypeSelected(tokenName)) {
      this.selectedTypes = this.getSelectedTypes()
        .filter((x) => x != tokenName)
        .join(',');
    } else {
      this.selectedTypes +=
        (this.getSelectedTypes().length > 0 ? ',' : '') + tokenName;
    }
    this.selectedTypesChange.emit(this.selectedTypes);
  }

  ngOnInit(): void {}
}
