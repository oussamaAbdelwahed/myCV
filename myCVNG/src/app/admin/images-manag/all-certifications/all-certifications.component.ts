import { Component, OnInit, OnDestroy } from '@angular/core';
import { CVImageService } from '../../../webservices/cvimage.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { CVImage } from '../../../models/cvimage';
import { ImageType } from '../../../commontasks/imagetype.enum';
declare const $: any;

@Component({
  selector: "app-all-certifications",
  templateUrl: "./all-certifications.component.html",
  styleUrls: ["./all-certifications.component.css"]
})
export class AllCertificationsComponent implements OnInit, OnDestroy {
  private imageServiceSub: Subscription;
  private elementId = null;
  public certifications: CVImage[];
  constructor(
    private imageService: CVImageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.subscribeToImageService();
    this.imageService.getAllByType(ImageType.CERTIFICATION);
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on('click', '#modalDeleteBtn', function(event) {
        _this.onDeleteImage();
    });
  }

  goBack() {
    this.location.back();
  }

  subscribeToImageService() {
    this.imageServiceSub = this.imageService.manyImagesSubject.subscribe(
      (emittedData: CVImage[]) => {
        this.certifications = emittedData;
         $("#maskforloading").fadeOut(600);
      }, (error) => {
        $("#maskforloading").fadeOut(10);
      }
    );
  }

  ngOnDestroy() {
    this.imageServiceSub.unsubscribe();
  }

  showModal(id) {
    this.elementId  = +id;
    $("#modalDeleteContent").modal("show");
  }

  onDeleteImage() {
    this.imageService.deleteImage(this.elementId).then(
      (resolvedData: boolean) => {
       if (resolvedData) {
         $("#cert" + this.elementId).remove();
       } else {
         console.log("not deleted");
       }
      }, (errorReject) => {
         console.log("error occured");
      }
    );
  }
}

