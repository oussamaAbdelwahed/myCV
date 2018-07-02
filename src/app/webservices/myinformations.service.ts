import { Injectable } from '../../../node_modules/@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { MyInformations } from '../models/myinformations';
import { Subject } from '../../../node_modules/rxjs/Subject';
import { API_URL } from '../commontasks/imagetype.enum';
import { EmailModel } from '../models/email';
import { resolve } from 'url';
import { reject } from '../../../node_modules/@types/q';


@Injectable()
export class MyInformationsService {
 private myInfos: MyInformations;
 public myInformationsSub: Subject<MyInformations> = new Subject<MyInformations>();
 constructor(private httpClient: HttpClient) {}

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

 public emitMyInformationsSubject() {
     this.myInformationsSub.next(this.myInfos);
 }
}
