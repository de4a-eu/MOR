import { Injectable } from '@angular/core';
import { Language } from '../classes/language';
import Langs from 'src/app/services/data/languages.json';

@Injectable({
  providedIn: 'root',
})
export class DataLoaderLanguagesService {
  private languages: Language[] = Langs;

  constructor() {}

  getLanguages = (): Language[] => {
    return this.languages;
  };
}
