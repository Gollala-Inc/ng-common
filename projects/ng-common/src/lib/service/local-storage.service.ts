import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  set(
    key: string, item: any
  ) {
    if (!this.isLocalStorageSupported) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(item));
  }

  setOn(
    ns: string[], key: string, item: any, separator = ':'
  ) {
    const namespaced = this.joinBy(ns, key, separator);

    this.set(namespaced, item);
  }

  get(
    key: string,
    parse: boolean = true,
  ) {
    if (!this.isLocalStorageSupported) {
      return null;
    }
    if (parse) {
      let parsed = null;
      try {
        parsed = JSON.parse(<string>localStorage.getItem(key));
      } catch (e) {
        console.error(`JSON parsing error, key: ${key}`, e);
      }
      return parsed;
    }

    return localStorage.getItem(key);
  }

  getOn(
    ns: string[],
    key: string,
    parse: boolean = true,
    separator: string = ':',
  ) {
    const namespaced = this.joinBy(ns, key, separator);

    return this.get(namespaced, parse);
  }

  remove(key: string) {
    if (!this.isLocalStorageSupported) {
      return;
    }
    localStorage.removeItem(key);
  }

  removeOn(ns: string[], key: string, separator: string = ':') {
    const namespaced = this.joinBy(ns, key, separator);

    localStorage.removeItem(namespaced);
  }

  removeNamespace(ns: string[], separator: string = ':') {
    const namespaced = ns.join(separator);

    const keys: string[] = Object.keys(localStorage);

    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i];
      if (key.indexOf(namespaced) >= 0) {
        this.remove(key);
      }
    }
  }

  private joinBy(ns: string[], key: string, separator: string) {
    return [...ns, key].join(separator);
  }
}
