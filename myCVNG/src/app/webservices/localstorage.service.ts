import { Injectable } from '@angular/core';
import { Admin } from '../models/admin';
const key = "loggedAdmin";
@Injectable()
export class LocalStorageService {
  constructor() {
    console.log("LocalStorageService");
  }

  persist(admin: Admin) {
    window.localStorage.setItem(key, JSON.stringify(admin));
  }

  delete() {
    window.localStorage.removeItem(key);
    window.localStorage.clear();
  }

  update(admin: Admin) {
    this.delete();
    window.localStorage.setItem(key, JSON.stringify(admin));
  }

  get(): Admin {
    const jsonString = window.localStorage.getItem(key);
    if (jsonString) {
       return  JSON.parse(jsonString);
    }
    return null;
  }
}
