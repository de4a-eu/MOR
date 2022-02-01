import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderXmlService {
  constructor() {}

  public async loadXml(file: string, type: string): Promise<string> {
    return await (
      await fetch('assets/canonical-evidence-types/' + type + '/' + file)
    ).text();
  }
}
