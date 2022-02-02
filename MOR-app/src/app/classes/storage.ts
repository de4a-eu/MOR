import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>(
  'Session storage',
  {
    providedIn: 'root',
    factory: () => sessionStorage,
  }
);
