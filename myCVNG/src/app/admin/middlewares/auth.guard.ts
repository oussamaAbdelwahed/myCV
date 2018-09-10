import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import { Observable } from "../../../../node_modules/rxjs/Observable";
import { LocalStorageService } from '../../webservices/localstorage.service';
import { Location  } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthMiddleware implements CanActivate {
   constructor(private localStorageService: LocalStorageService, private location: Location) {
       console.log("******AuthMiddleware******");
   }

   canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
       if (this.localStorageService.get()) {
          return true;
       }
       this.location.back();
    return false;
   }
}

