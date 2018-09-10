import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CVImageService } from '../../../webservices/cvimage.service';
import { CVImage } from '../../../models/cvimage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageType } from '../../../commontasks/imagetype.enum';
import { Location } from '@angular/common';
declare const $: any;
@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit, OnDestroy {

  public image: CVImage;
  private routeSubscription: Subscription;
  private imageServiceSub: Subscription;
  public imageToUpload: File = null;
  public updateForm: FormGroup = null;
  public message = "";
  constructor(private route: ActivatedRoute, private imageService: CVImageService, private formBuilder: FormBuilder,
    private location: Location) { }


  ngOnInit() {
    $("#maskforloading").fadeIn(0);
    this.initUpdateForm();
    this.subscribeToImageService();
    this.extractIdFromUrl();
  }

  extractIdFromUrl() {
    this.routeSubscription = this.route.params.subscribe((params) => {
        this.imageService.getOneById(+params["id"]);
    });
  }

  subscribeToImageService() {
    this.imageServiceSub = this.imageService.oneImageSubject.subscribe(
      (emittedData: CVImage) => {
        $("#maskforloading").fadeOut(600);
        this.image = emittedData;
        this.fillUpdateForm();
      }, (error) => {
        $("#maskforloading").fadeOut(600);
      }
    );
  }

  initUpdateForm() {
     this.updateForm = this.formBuilder.group({
      'image': [''],
      'show': ['', [Validators.required, Validators.max(1), Validators.min(0)]],
      'alt': ['', [Validators.required]],
      'description': ['']
     });
  }

  fillUpdateForm() {
    this.updateForm = this.formBuilder.group({
      'image': [''],
      'show': [this.image.show ? 1 : 0, [Validators.required, Validators.max(1), Validators.min(0)]],
      'alt': [this.image.alt, [Validators.required]],
      'description': [this.image.description,
        [this.image.type === ImageType.CERTIFICATION ? Validators.required : Validators.nullValidator]]
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.imageServiceSub.unsubscribe();
  }

  onSubmit() {
     const formFields = this.updateForm.value;
     const objImg = {};
     objImg["show"] = formFields["show"];
     objImg["alt"] = formFields["alt"];
     objImg['id'] = this.image.id;
     objImg["description"] = formFields["description"];
     objImg["image"] = this.image;

      this.imageService.updateImage(this.imageToUpload, objImg).then(
        (resolvedData: boolean) => {
          if (resolvedData) {
               this.location.back();
          } else {
            this.message = "une erreur est survenu, ressayer !";
          }
        }, (error) => {
           this.message = "une erreur est survenu, ressayer !";
        }
      );
  }

  onChangeFile(event) {
    const objectUrl = window.URL || window['webkitURL'];
    this.imageToUpload = <File>event.target.files[0];
    const url = objectUrl.createObjectURL(this.imageToUpload);
    this.image.src  = url;
  }
}

