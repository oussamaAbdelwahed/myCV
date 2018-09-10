import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "../../../../node_modules/rxjs/Observable";
import { LocalStorageService } from '../../webservices/localstorage.service';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class LoginViewMiddleware implements CanActivate {
    constructor(private router: Router, private localStorageService: LocalStorageService) {
        console.log("*****LoginViewMiddleware******");
    }
   public canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.localStorageService.get()) {
        this.router.navigate(["admin", "dashboard"]);
        return false;
    }
    return  true;
   }
}

