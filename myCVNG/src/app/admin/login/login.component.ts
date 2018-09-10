import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginService } from '../../webservices/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Admin } from '../../models/admin';
import { Login } from "../../models/login";
import { Router } from "@angular/router";
import { LocalStorageService } from '../../webservices/localstorage.service';
declare const $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginServiceSub: Subscription;
  public loggedAdmin: Admin;
  public formLogin: FormGroup;
  public error: string;
  constructor(
               private localStorageService: LocalStorageService,
               private loginService: LoginService,
               public formBuilder: FormBuilder,
               private router: Router
             ) {}

  ngOnInit() {
    this.initLoginForm();
    this.subscribeToLoginSubject();
  }

  initLoginForm() {
    this.formLogin = this.formBuilder.group({
      email : ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  subscribeToLoginSubject() {
    this.loginServiceSub = this.loginService.loginSubject.subscribe(
        (emittedData: Admin) => {
          $("#maskforloading").fadeOut(600);
          if (emittedData === null) {
            this.error = "invalid credentials";
          } else {
            this.localStorageService.persist(emittedData);
            this.loggedAdmin = emittedData;
            this.router.navigate(["admin", "dashboard"]);
          }
        }, (error) => {
          $("#maskforloading").fadeOut(600);
        }
    );
  }

  onSubmitLogin() {
    $("#maskforloading").fadeIn(0);
     const formVals = this.formLogin.value;
     const login  = new Login(formVals.email, formVals.password);
     this.loginService.logItIn(login);
  }

  ngOnDestroy() {
     this.loginServiceSub.unsubscribe();
  }
}
