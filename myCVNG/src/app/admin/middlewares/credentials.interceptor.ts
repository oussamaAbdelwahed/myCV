import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from '../../webservices/localstorage.service';
declare const $: any;
@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
   constructor(private router: Router, private localStorageService: LocalStorageService) {
       console.log("******CredentialsInterceptor******");
   }

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       request = request.clone({ withCredentials: true });
       return next.handle(request).do((success: HttpResponse<any>) => {
       }, (error: HttpErrorResponse) => {
           if (error.status === 401) {
              this.localStorageService.delete();
              this.router.navigate(["admin", "login"]);
               $("#maskforloading").fadeOut(0);
           }
           if (error.status === 500) {
               $("#maskforloading").fadeOut(0);
           }
       });
   }
}

