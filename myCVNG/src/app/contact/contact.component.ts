import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MyInformations } from '../models/myinformations';
import { MyInformationsService } from '../webservices/myinformations.service';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { EmailModel } from '../models/email';
declare const $: any;

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit, OnDestroy {
  private windowWidth: number;
  private windowHeight: number;
  private myInfosSub: Subscription;
  public myInfos: MyInformations = null;
  public emailForm: FormGroup;
  constructor(
    private myInfosService: MyInformationsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initEmailForm();
    this.subscribeToMyInfosService();
    this.documentHeightAndWidth();
  }
  ngOnDestroy() {
    this.myInfosSub.unsubscribe();
  }
  documentHeightAndWidth(): void {
    this.windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    setInterval(() => {
      this.windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.windowWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.windowHeight -= 60;
    }, 1000);
  }

  getHeight() {
    return this.windowHeight + "px";
  }
  getWidth() {
    return this.windowWidth + "px";
  }
  subscribeToMyInfosService() {
    this.myInfosSub = this.myInfosService.myInformationsSub.subscribe(
      (emittedData: MyInformations) => {
        this.myInfos = emittedData;
      }
    );
  }

  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      emailAddress: ["", [Validators.required, Validators.email]],
      emailSubject: [""],
      emailContent: ["", [Validators.required, Validators.maxLength(200), Validators.minLength(10)] ]
    });
  }

  onSubmitEmailForm () {
    $('#submitbutton').attr('disabled', true);
    $("#maskforloading").fadeIn(10);
    const formValue = this.emailForm.value;
    const email = new EmailModel(formValue["emailAddress"], formValue["emailContent"], formValue['emailSubject']);
    this.myInfosService.sendEmail(email).then((data: boolean) => {
      $("#maskforloading").fadeOut(10);
      if (data) {
        setTimeout(() => {
          $('#submitbutton').attr('disabled', false);
          $("#modaltargetappend").empty().append("<p class='text-success'>votre email a été envoyé</p>");
          $("#myModal").modal("show");
        }, 2000);
      } else {
        $('#submitbutton').attr('disabled', false);
        $("#modaltargetappend").empty().append("<p class='text-danger'>une erreur s'est produite ressayer SVP !</p>");
        $("#myModal").modal("show");
      }
    });
  }
}
