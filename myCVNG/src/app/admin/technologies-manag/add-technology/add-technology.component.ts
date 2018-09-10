import { Component, OnInit } from '@angular/core';
import { TechnologyService } from '../../../webservices/technology.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: "app-add-technology",
  templateUrl: "./add-technology.component.html",
  styleUrls: ["./add-technology.component.css"]
})
export class AddTechnologyComponent implements OnInit {
  public addTechForm: FormGroup;
  private techFile: File = null;
  public srcImg = null;
  public valLevel = "";
  constructor(
    private technologyService: TechnologyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmitForm() {
    const formValue = this.addTechForm.value;
    const obj = {};
    obj['name'] = formValue['name'];
    obj['level'] = formValue['level'];
    $("#maskforloading").fadeIn(0);
    this.technologyService.saveTechnology(this.techFile, obj).then(
      (resolvedData: boolean) => {
        if (resolvedData) {
          this.router.navigate(["admin", "dashboard", "technologies"]);
        }
        $("#maskforloading").fadeOut(600);
      }, (error) => {
          console.log(error);
          $("#maskforloading").fadeOut(600);
      });
  }

  initForm() {
    this.addTechForm = this.formBuilder.group({
      name: ["", Validators.required],
      level: [
        "",
        [Validators.required, Validators.min(20), Validators.max(95)]
      ],
      technology: ["", Validators.required]
    });
  }

  onChangeFile(event) {
    this.techFile = <File>event.target.files[0];
    const url = window.URL || window['webkitURL'];
    this.srcImg = url.createObjectURL(this.techFile);
  }

  onChangeLevel(event) {
     this.valLevel = event.target.value + "%";
  }
}
