import { Injectable} from '@angular/core';
import {Admin} from '../models/admin';
import { Login } from '../models/login';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../commontasks/imagetype.enum';

@Injectable()
export class LoginService {
   public loginSubject: Subject<Admin> = new Subject<Admin>();
   private loggedAdmin: Admin;
   constructor(private httpClient: HttpClient) {
     console.log("LoginService");
   }

   logItIn(loginModel: Login) {
     const headers = new HttpHeaders(loginModel ? {
       authorization: 'Basic ' + btoa(loginModel.email + ':' + loginModel.password),
     } : {});
     this.httpClient.get<any>(API_URL + "/account/login", {headers : headers}).subscribe(
       (successData: any) => {
         const firstName = successData.principal.firstName;
         const lastName = successData.principal.lastName;
         const email = successData.name;
         const id = successData.principal.id;
         this.loggedAdmin = new Admin(firstName, lastName, email, id);
         this.emitLoginSubject();
       }, (errorData) => {
         this.loggedAdmin = null;
         this.emitLoginSubject();
       }
     );
   }

   logItOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(API_URL + "/account/logout", {}).subscribe(
         (success) => {
            resolve(true);
         }, (error) => {
            resolve(false);
         }
      );
    });
   }

   test() {
     this.httpClient.get(API_URL + "/account/requiredlogin").subscribe(
       (success) => {
         console.log(success);
       }, (error) => {
         console.log(error);
       }
     );
   }

   emitLoginSubject() {
     this.loginSubject.next(this.loggedAdmin);
   }
}
