/*
 * Copyright (C) 2023, Partners of the EU funded DE4A project consortium
 * (https://www.de4a.eu/consortium), under Grant Agreement No.870635
 * Author: Dejan Lavbič (www.lavbic.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
export class StorageService {
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
