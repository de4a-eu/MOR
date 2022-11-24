import { Component, Input, OnInit } from "@angular/core";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { IalService } from "src/app/services/ial.service";
import { URL } from "../../classes/settings";

@Component({
  selector: "de4a-country-selector",
  templateUrl: "./country-selector.component.html",
})
export class CountrySelectorComponent implements OnInit {
  @Input("canonicalEvidenceType") canonicalEvidenceType!: string;
  constructor(public dataLoader: DataLoaderService, public ial: IalService) {}

  public flagURL?: string;

  public selectCountry(
    canonicalEvidenceType: string,
    countryCode: string
  ): void {
    this.dataLoader.setCountry(canonicalEvidenceType, countryCode);
    this.ial.canonicalEvidenceCountries[canonicalEvidenceType] = countryCode;
    delete this.ial.provisions[canonicalEvidenceType];
  }

  ngOnInit(): void {
    this.flagURL = URL.flags;
  }
}
