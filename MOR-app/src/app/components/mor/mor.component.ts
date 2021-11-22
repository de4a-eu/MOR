import { Component, Input, OnInit } from '@angular/core';
import { DataLoaderService } from 'src/app/services/data-loader.service';
import { faAddressCard, faIdCardAlt, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mor',
  templateUrl: './mor.component.html',
  styleUrls: ['./mor.component.css'],
})
export class MORComponent implements OnInit {
  @Input('defaultLang') language!: string;
  @Input('requesterCountryCode') requesterCountry!: string;
  @Input('canonicalEvidenceTypes') canonicalEvidenceTypes!: string;

  faAddressCard = faAddressCard;
  faIdCardAlt = faIdCardAlt;
  faCloudUploadAlt = faCloudUploadAlt;

  constructor(private dataLoader: DataLoaderService) {}

  public getMaxEvidences(): number {
    return this.canonicalEvidenceTypes
      ? this.canonicalEvidenceTypes.split(',').length
      : 0;
  }

  public getCanonicalEvidenceType(code: string) {
    return this.dataLoader.getCanonicalEvidenceType(code);
  }

  public getSelectedCanonicalEvidenceTypes = () => {
    return this.canonicalEvidenceTypes.length == 0
      ? []
      : this.canonicalEvidenceTypes
          .split(',')
          .map((x) => this.getCanonicalEvidenceType(x));
  };

  public getLanguage(code: string) {
    return this.dataLoader.getLanguage(code);
  }

  public getCountries = () => {
    return this.dataLoader.getCountries();
  };

  public getCountry(code: string) {
    return this.dataLoader.getCountry(code);
  }

  ngOnInit(): void {}
}
