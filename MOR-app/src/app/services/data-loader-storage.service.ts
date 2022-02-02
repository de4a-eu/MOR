import { Inject, Injectable } from '@angular/core';
import { STORAGE } from '../classes/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderStorageService {

  constructor(@Inject(STORAGE) private storage: Storage,) { }

  public add(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  public addArray(key: string, value: any[]) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get(key: string): string {
    let value = this.storage.getItem(key);
    return value ? value : "";
  }

  public remove(key: string) {
    this.storage.removeItem(key);
  }
}
