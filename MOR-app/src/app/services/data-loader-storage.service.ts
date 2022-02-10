import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { STORAGE } from '../classes/storage';

export interface StorageChange {
  key: string;
  value: string;
  storageArea: 'localStorage' | 'sessionStorage';
}

@Injectable({
  providedIn: 'root',
})
export class DataLoaderStorageService {
  public storageChange$: ReplaySubject<{ key: string; value: string }> =
    new ReplaySubject();

  constructor(@Inject(STORAGE) private storage: Storage) {}

  public add(key: string, value: string) {
    this.storage.setItem(key, value);
    this.storageChange$.next({ key: key, value: value });
  }

  public addArray(key: string, value: any[]) {
    let newValue = JSON.stringify(value);
    this.storage.setItem(key, newValue);
    this.storageChange$.next({ key: key, value: newValue });
  }

  public get(key: string): string {
    let value = this.storage.getItem(key);
    return value ? value : '';
  }

  public remove(key: string) {
    this.storage.removeItem(key);
  }
}
