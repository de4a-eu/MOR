import { Component, OnInit } from "@angular/core";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { URL } from "../../classes/settings";

@Component({
  selector: "de4a-language-selector",
  templateUrl: "./language-selector.component.html",
})
export class LanguageSelectorComponent implements OnInit {
  public flagURL?: string;

  constructor(public dataLoader: DataLoaderService) {}

  ngOnInit(): void {
    this.flagURL = URL.flags;
  }
}
