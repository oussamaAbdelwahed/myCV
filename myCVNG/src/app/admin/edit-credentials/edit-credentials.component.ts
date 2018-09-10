import { Component, OnInit, OnDestroy } from "@angular/core";
import { AdminService } from '../../webservices/admin.service';
import { LocalStorageService } from '../../webservices/localstorage.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Admin } from '../../models/admin';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;
@Component({
  selector: "app-edit-credentials",
  templateUrl: "./edit-credentials.component.html",
  styleUrls: ["./edit-credentials.component.css"]
})
export class EditCredentialsComponent implements OnInit, OnDestroy {
  public editCredentialsForm: FormGroup;
  private admin: Admin;
  private adminServiceSub: Subscription;
  public changePassword = false;
  public errorMessage = "";

  constructor(
    private adminService: AdminService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.subscribeToAdminService();
    this.getAdmin();
    this.initForm();
  }

  onSubmitForm() {
    $("#maskforloading").fadeIn(0);
    const val = this.editCredentialsForm.value;
    const credentials = {};
    credentials['id'] = this.admin.id;
    credentials['firstName'] = val['firstName'];
    credentials['lastName'] = val['lastName'];
    credentials['email'] = val['email'];
    let oldPassword = "";
    if (val["newPassword"] && val["oldPassword"]) {
      credentials["password"] = val["newPassword"];
      oldPassword = val['oldPassword'];
    }
    this.adminService.updateCredentials(oldPassword, credentials);
  }

  ngOnDestroy() {
    this.adminServiceSub.unsubscribe();
  }

  initForm() {
    this.editCredentialsForm = this.formBuilder.group({
      firstName: [this.admin.firstName, Validators.required],
      lastName: [this.admin.lastName, Validators.required],
      email: [this.admin.email, [Validators.required, Validators.email]],
      oldPassword: [""],
      newPassword: [""]
    });
  }

  getAdmin() {
    this.admin = this.localStorageService.get();
  }

  subscribeToAdminService() {
    this.adminServiceSub = this.adminService.adminSubject.subscribe(
       (emittedData: Admin) => {
         $("#maskforloading").fadeOut(600);
         if (emittedData === null) {
           this.errorMessage = "l ancien mot de passe est incorrecte";
         } else {
           this.admin = emittedData;
           this.localStorageService.update(emittedData);
           this.router.navigate(["admin", "dashboard"]);
         }
       }, (error) => {
         $("#maskforloading").fadeOut(10);
       }
    );
  }

  toggleChangePasswordView() {
     this.changePassword = !this.changePassword;
  }
}
