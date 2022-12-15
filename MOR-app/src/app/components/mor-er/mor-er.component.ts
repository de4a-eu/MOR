import { Component, OnInit, ElementRef, SimpleChanges } from "@angular/core";
import { DataLoaderService } from "src/app/services/data-loader.service";
import { IalService } from "src/app/services/ial.service";
import { StorageService } from "src/app/services/storage.service";
import { DummyData, URL } from "../../classes/settings";

declare var bootstrap: any;

const generateRandomData: boolean = true;

@Component({
  selector: "de4a-mor-er",
  templateUrl: "./mor-er.component.html",
})
export class MORERComponent implements OnInit {
  /**
   * Input parameters
   */
  defaultLanguage: string;
  requesterCountry: string;
  //canonicalEvidenceTypes: string[];
  outputJSArrayId: string;

  /**
   * Do not show component content if input parameters are invalid
   */
  inputParamsValid: boolean = true;

  /**
   * MOR-ER process is complete
   */
  public complete: boolean = false;

  /**
   * Selected evidence type for schema preview
   */
  public selectedEvidenceType!: string;

  /**
   * Whether to show description in canonical evidence schema preview
   */
  public showDescription: boolean = true;

  public modalSelectProvision: any;
  public modalSelectProvisionData: any = {
    canonicalEvidenceType: "",
    morId: "",
    canonicalEvidenceTypeName: "",
    country: "",
  };

  public modalPreview: any;

  constructor(
    public elementRef: ElementRef,
    public dataLoader: DataLoaderService,
    public ial: IalService,
    private storage: StorageService
  ) {
    /**
     * Get (static) input parameters of MOR-ER component and
     * check their validity
     */
    const native = this.elementRef.nativeElement;
    this.defaultLanguage = native.getAttribute("default-lang");
    if (
      !this.dataLoader
        .getLanguages()
        .map((lang) => lang.code)
        .includes(this.defaultLanguage)
    )
      this.inputParamsValid = false;
    else {
      dataLoader.setDefaultLanguage(this.defaultLanguage);
      dataLoader.setLanguage(this.defaultLanguage);
    }
    this.requesterCountry = native.getAttribute("requester-country-code");
    if (
      !this.dataLoader
        .getCountries()
        .map((country) => country.code)
        .includes(this.requesterCountry)
    )
      this.inputParamsValid = false;
    else dataLoader.disabledCountryCode = this.requesterCountry;
    ial.canonicalEvidenceTypes = native
      .getAttribute("canonical-evidence-types")
      .split(",");
    if (
      !ial.canonicalEvidenceTypes.every((x) =>
        this.dataLoader.canonicalEvidenceTypes
          .map((evidenceType) => evidenceType.tokenName)
          .includes(x)
      )
    )
      this.inputParamsValid = false;
    this.outputJSArrayId = native.getAttribute("output-j-s-array-id");
    if (this.outputJSArrayId == null) this.inputParamsValid = false;
  }

  /**
   * This function calls the IAL API with the given parameters and
   * returns the HTTP code of the response.
   * The response text is stored in the variable "ialProvisions" or
   * null if an error is returned
   * @value {list} canEvidTokenList : a mandatory comma-separated list
   * with the canonical evidence type tokens to request (e.g. BirthEvidence)
   * @value {string} atuCode : an optional string with the code of
   * an administrative territorial unit to request, usually a NUTS-0 code
   * corresponding to the issuing country
   * @value {boolean} asXml :  an optional boolean. "True" forces that
   * the "ialProvisions" text is in XML format; otherwise, it is in JSON format
   * @return {int} : HTTP status code of the return; "200" is representing
   * a suscessful call. "404" when the search has not found results.
   */
  public ialAPIrequestList(
    canEvidTokenList: string,
    atuCode: string,
    showModal: boolean = false
  ) {
    let urlApi =
      URL.serverIALapi +
      canEvidTokenList
        .split(",")
        .map((x) => URL.canEvidUrn + x)
        .join(",") +
      ":1.0" +
      (atuCode != "" ? "/" + atuCode : "");

    /**
     * Get token name from MOR ID
     */
    let canEvType = this.dataLoader.canonicalEvidenceTypes.find(
      (type) => type.morID == canEvidTokenList
    )?.tokenName;

    /**
     * Check if generate dummy data
     */
    let generateDummyData = DummyData.generateIalData;
    if (
      this.storage.get("de4a-dummy-data") &&
      this.storage.get("de4a-dummy-data") == "true"
    ) {
      generateDummyData = true;
    } else if (
      this.storage.get("de4a-dummy-data") &&
      this.storage.get("de4a-dummy-data") == "false"
    ) {
      generateDummyData = false;
    }

    if (generateDummyData) {
      let dummyRandomData = [];
      for (
        let i = 1;
        i <=
        this.dataLoader.getRandomIntInclusive(
          DummyData.generateIalDataRange[0],
          DummyData.generateIalDataRange[1]
        );
        i++
      ) {
        dummyRandomData.push({
          atuLevel: "nuts0",
          atuCode: atuCode,
          atuLatinName: this.dataLoader.countries.find(
            (country) => country.code == atuCode
          )?.name,
          dataOwnerID:
            "iso" +
            (Math.random() + 1).toString(36).substring(8) +
            "-actorid-upis::" +
            (Math.random() + 1).toString(36).substring(2),
          dataOwnerPrefLabel:
            "Data owner label " + (Math.random() + 1).toString(36).substring(4),
        });
      }
      this.ial.provisions[canEvType!] = dummyRandomData;

      if (
        typeof this.ial.provisions[canEvType!] == "object" &&
        this.ial.provisions[canEvType!].length > 1
      ) {
        let type = this.ial
          .getEvidenceTypesForRequest()
          .find((x) => x.tokenName == canEvType);

        this.modalSelectProvisionData.canonicalEvidenceType = canEvType;
        this.modalSelectProvisionData.morId = type ? type.morID : "";
        this.modalSelectProvisionData.canonicalEvidenceName = type
          ? type.name
          : "";
        this.modalSelectProvisionData.country = this.dataLoader.getCountryName(
          canEvType!
        );

        if (showModal) this.modalSelectProvision.show();
      }
    } else {
      this.ial.retrieveIALProvisions(urlApi).subscribe({
        next: (response: any) => {
          if (response.hasOwnProperty("errors")) {
            this.ial.provisions[canEvType!] = "not available";
          } else if (
            response.hasOwnProperty("items") &&
            response.items.length == 1 &&
            response.items[0]["canonicalObjectTypeId"].indexOf(
              canEvidTokenList
            ) > -1 &&
            response.items[0].countries.length == 1 &&
            response.items[0].countries[0].countryCode == atuCode
          ) {
            this.ial.provisions[canEvType!] =
              response.items[0].countries[0].provisions;
          }

          if (
            typeof this.ial.provisions[canEvType!] == "object" &&
            this.ial.provisions[canEvType!].length > 1
          ) {
            let type = this.ial
              .getEvidenceTypesForRequest()
              .find((x) => x.tokenName == canEvType);

            this.modalSelectProvisionData.canonicalEvidenceType = canEvType;
            this.modalSelectProvisionData.morId = type ? type.morID : "";
            this.modalSelectProvisionData.canonicalEvidenceName = type
              ? type.name
              : "";
            this.modalSelectProvisionData.country =
              this.dataLoader.getCountryName(canEvType!);

            if (showModal) this.modalSelectProvision.show();
          }
        },
        error: (error: any) => {
          console.log("Error retrieving provisions.");
          console.log(error);
        },
      });
    }
  }

  public requestProvision(
    canonicalEvidenceType: string,
    showModal: boolean = true
  ): void {
    let canEvType = this.dataLoader.canonicalEvidenceTypes.find(
      (type) => type.tokenName == canonicalEvidenceType
    );
    if (canEvType) {
      this.ialAPIrequestList(
        canEvType.morID || "",
        this.ial.canonicalEvidenceCountries[canonicalEvidenceType],
        showModal
      );
    } else {
      console.log("Error retrieving canonical evidence type");
    }
  }

  public previewEvidence(tokenName: string | undefined) {
    if (tokenName) {
      this.selectedEvidenceType = tokenName;
      this.modalPreview.show();
    }
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
      reader.addEventListener("load", (result) => {
        if (result.target)
          this.ial.uploads[canonicalEvidenceType] = result.target.result;
      });
      reader.readAsText(input.files[0], "UTF-8");
    }
  }

  /**
   * Create output of explicit request
   */
  public finishExplicitRequest() {
    let result: any[] = [];
    Object.keys(this.ial.retrievalType).map((type) => {
      if (this.ial.retrievalType[type] == "upload") {
        let uploadClean = this.ial.uploads[type].replace(/\n\s*/g, "");
        result.push({
          canonicalEvidenceType: type,
          uploadedDocument: uploadClean,
        });
      } else if (this.ial.retrievalType[type] == "request") {
        if (this.ial.provisions[type].length == 1) {
          result.push({
            canonicalEvidenceType: type,
            provision: this.ial.provisions[type][0],
          });
        } else if (this.ial.provisions[type].length > 1) {
          let selectedProvision = {
            canonicalEvidenceType: type,
            provision: this.ial.provisions[type].find((x: any) => x.selected),
          };
          delete selectedProvision.provision.selected;
          result.push(selectedProvision);
        }
      }
    });
    this.storage.addArray(this.outputJSArrayId, result);
    this.complete = true;
  }

  /**
   * Check if one provision from provided list is selected
   * @returns true if one provision is selected
   */
  public isProvisionSelected(): boolean {
    let selected = false;
    try {
      selected =
        this.ial.provisions[
          this.modalSelectProvisionData.canonicalEvidenceType
        ] &&
        this.ial.provisions[
          this.modalSelectProvisionData.canonicalEvidenceType
        ].find((x: any) => x.selected);
    } finally {
      return selected;
    }
  }

  ngOnInit(): void {
    /**
     * Default select request for all canonical evidence types
     */
    this.ial.canonicalEvidenceTypes.map((type) => {
      this.ial.toggleRetrievalType(type, "request");
    });

    this.storage.remove(this.outputJSArrayId);
  }

  ngAfterViewInit(): void {
    // Enable Bootstrap tooltip
    [].slice
      .call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .map((element) => new bootstrap.Tooltip(element));
    // Bootstrap modals
    this.modalSelectProvision = new bootstrap.Modal(
      document.getElementById("selectProvisionModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
    // Bootstrap modals
    this.modalPreview = new bootstrap.Modal(
      document.getElementById("previewEvidenceSchemaModal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  }
}
