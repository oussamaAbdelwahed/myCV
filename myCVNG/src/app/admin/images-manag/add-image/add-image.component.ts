import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CVImageService } from '../../../webservices/cvimage.service';
import { Location } from '@angular/common';

declare const $: any;

@Component({
  selector: "app-add-image",
  templateUrl: "./add-image.component.html",
  styleUrls: ["./add-image.component.css"]
})
export class AddImageComponent implements OnInit, OnDestroy {
  public addImageForm: FormGroup;
  public selectedFile: File = null;
  public imageUrl: string = null;
  public imType = "CERTIFICATION";

  public imageTypes = ["CERTIFICATION", "NAVBAR_LOGO", "ME_BIG_PICTURE"];
  constructor(
    private formBuilder: FormBuilder,
    private imageService: CVImageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {}

  initForm() {
    this.addImageForm = this.formBuilder.group({
      name: [""],
      type: ["CERTIFICATION", Validators.required],
      show: [1, [Validators.required, Validators.max(1), Validators.min(0)]],
      alt: ["", Validators.required],
      description: [""],
      image: ["", Validators.required]
    });
  }

  onChangeImage(event) {
    const url = window.URL || window["webkitURL"];
    this.selectedFile = event.target.files[0];
    this.imageUrl = url.createObjectURL(this.selectedFile);
  }

  onSubmitForm() {
    $("#maskforloading").fadeIn(0);
    const formValue = this.addImageForm.value;
    this.imageService.saveImage(this.selectedFile, formValue).then(
      (resolvedData: boolean) => {
        $("#maskforloading").fadeOut(10);
        if (resolvedData) {
          this.location.back();
        } else {
        }
      },
      error => {
        $("#maskforloading").fadeOut(10);
        console.log(error);
      }
    );
  }

}

