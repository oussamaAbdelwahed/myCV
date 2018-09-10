import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../webservices/login.service";
import { LocalStorageService } from '../../webservices/localstorage.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    /*this.loginService.test();*/
  }

  logout() {
    this.loginService.logItOut().then((resolvedData: boolean) => {
      if (resolvedData) {
        this.localStorageService.delete();
        this.router.navigate(["admin", "login"]);
      }
    });
  }

}

