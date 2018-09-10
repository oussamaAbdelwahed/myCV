import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyInformationsService } from '../../webservices/myinformations.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MyInformations } from '../../models/myinformations';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
declare const $: any;
@Component({
  selector: "app-edit-informations",
  templateUrl: "./edit-informations.component.html",
  styleUrls: ["./edit-informations.component.css"]
})
export class EditInformationsComponent implements OnInit, OnDestroy {
  public editInfosForm: FormGroup;
  public myInfos: MyInformations;
  private myInfosServiceSub: Subscription;
  constructor(
    private myInfosService: MyInformationsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    $("#maskforloading").fadeIn(0);
    this.initForm();
    this.subscribeToMyInfosService();
    this.myInfosService.getMyInformations();
  }

  initForm() {
    this.editInfosForm = this.formBuilder.group({
      tel: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
      zip: ["", Validators.required],
      paragraphe: ["", [Validators.required, Validators.minLength(50)]]
    });
  }

  fillForm() {
    this.editInfosForm = this.formBuilder.group({
      tel: [this.myInfos.tel, Validators.required],
      email: [this.myInfos.email, [Validators.required, Validators.email]],
      address: [this.myInfos.address, Validators.required],
      zip: [this.myInfos.zip, Validators.required],
      paragraphe: [
        this.myInfos.paragraphe,
        [Validators.required, Validators.minLength(50)]
      ]
    });
  }

  subscribeToMyInfosService() {
    this.myInfosServiceSub = this.myInfosService.myInformationsSub.subscribe(
      (emittedData: MyInformations) => {
        $("#maskforloading").fadeOut(600);
        this.myInfos = emittedData;
        this.fillForm();
      },
      error => {
        $("#maskforloading").fadeOut(600);
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.myInfosServiceSub.unsubscribe();
  }

  onSubmitForm() {
    $("#maskforloading").fadeIn(0);
    const val = this.editInfosForm.value;
    val['id'] = this.myInfos.id;
    val['current'] = true;
    this.myInfosService.updateMyInfos(val).then(
        (resolvedData: boolean) => {
          $("#maskforloading").fadeOut(600);
          if (resolvedData) {
            this.router.navigate(["admin", "dashboard"]);
          }
        }, (error) => {
          $("#maskforloading").fadeOut(600);
          console.log(error);
        }
    );
  }
}
