import { Injectable } from "@angular/core";
import { Admin } from '../models/admin';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../commontasks/imagetype.enum';
@Injectable()
export class AdminService {
 private admin: Admin;
 public adminSubject: Subject<Admin> = new Subject<Admin>();
 constructor(private httpClient: HttpClient) {
     console.log("AdminService");
 }

 updateCredentials(oldPassword, credentials) {
     const formData = new FormData();
     formData.append("oldPassword", oldPassword);
     formData.append("admin", JSON.stringify(credentials));
     this.httpClient
       .post<Admin>(API_URL + "/admin/updatecredentials", formData)
       .subscribe(
         (successData: Admin) => {
           this.admin = successData;
           this.emitAdminSubject();
         },
         errorRep => {
           this.admin = null;
           this.emitAdminSubject();
         }
       );
 }

 emitAdminSubject() {
     this.adminSubject.next(this.admin);
 }

}
