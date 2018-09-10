import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyInformations } from '../models/myinformations';
import { Subject } from 'rxjs/Subject';
import { API_URL } from '../commontasks/imagetype.enum';
import { EmailModel } from '../models/email';

@Injectable()
export class MyInformationsService {
 private myInfos: MyInformations;
 public myInformationsSub: Subject<MyInformations> = new Subject<MyInformations>();
 constructor(private httpClient: HttpClient) {
     console.log("MyInformationsService");
 }

  getMyInformations() {
      this.httpClient.get<MyInformations>(API_URL + '/myinformations/get' ).subscribe(
       (infos: MyInformations) => {
           this.myInfos = infos;
           this.emitMyInformationsSubject();
       }
   );
 }

 sendEmail(email: EmailModel) {
     // tslint:disable-next-line:no-shadowed-variable
     return new Promise<boolean>((resolve, reject) => {
         this.httpClient.post<boolean>(API_URL + '/myinformations/sendemail', email) .subscribe(
             (successData: boolean) => {
                 resolve(successData);
             }, (errorData: boolean) => {
                 resolve(errorData);
             }
         );
     });
 }

 updateMyInfos(infos) {
     // tslint:disable-next-line:no-shadowed-variable
     return new Promise<Boolean>((resolve, reject) => {
         this.httpClient.post(API_URL + "/admin/myinfos/update", infos).subscribe(
             (successData: boolean) => {
                resolve(successData);
             }, (errorRep) => {
                resolve(false);
             });
     });
 }

 public emitMyInformationsSubject() {
     this.myInformationsSub.next(this.myInfos);
 }
}
