import { Component, OnInit, OnDestroy } from '@angular/core';
import { CVImageService } from '../../../webservices/cvimage.service';
import { Subscription } from 'rxjs/Subscription';
import { CVImage } from '../../../models/cvimage';
import { ImageType } from '../../../commontasks/imagetype.enum';
declare const $: any;

@Component({
  selector: "app-all-me-big-pictures",
  templateUrl: "./all-me-big-pictures.component.html",
  styleUrls: ["./all-me-big-pictures.component.css"]
})
export class AllMeBigPicturesComponent implements OnInit, OnDestroy {
  private imageServiceSub: Subscription;
  private elementId = null;
  public myPictures: CVImage[];

  constructor(private imageService: CVImageService) {}

  ngOnInit() {
    this.subscribeToImageService();
    this.imageService.getAllByType(ImageType.ME_BIG_PICTURE);
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on('click', '#modalDeleteBtn', function (event) {
      _this.onDeleteImage();
    });
  }


  showModal(id) {
    this.elementId  = +id;
    $("#modalDeleteContent").modal("show");
  }

  subscribeToImageService() {
    this.imageServiceSub = this.imageService.manyImagesSubject.subscribe(
      (emittedData: CVImage[]) => {
        this.myPictures = emittedData;
        $("#maskforloading").fadeOut(600);
      }, (error) => {
         console.log(error);
         $("#maskforloading").fadeOut(600);
      }
    );
  }

  ngOnDestroy() {
    this.imageServiceSub.unsubscribe();
  }


  onDeleteImage() {
    this.imageService.deleteImage(this.elementId).then(
      (resolvedData: boolean) => {
       if (resolvedData) {
         $("#mypic" + this.elementId).remove();
       } else {
         console.log("not deleted");
       }
      }, (errorReject) => {
         console.log("error occured");
      }
    );
  }
}
