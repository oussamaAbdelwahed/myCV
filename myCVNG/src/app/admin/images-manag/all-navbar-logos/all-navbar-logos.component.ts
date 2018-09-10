import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CVImage } from '../../../models/cvimage';
import { CVImageService } from '../../../webservices/cvimage.service';
import { ImageType } from '../../../commontasks/imagetype.enum';
declare const $: any;
@Component({
  selector: 'app-all-navbar-logos',
  templateUrl: './all-navbar-logos.component.html',
  styleUrls: ['./all-navbar-logos.component.css']
})
export class AllNavbarLogosComponent implements OnInit, OnDestroy {
  public logos: CVImage[];
  private imageServiceSub: Subscription;
  private elementId = null;

  constructor(private imageService: CVImageService) { }

  ngOnInit() {
    this.subscribeToImageService();
    this.imageService.getAllByType(ImageType.NAVBAR_LOGO);
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on('click', '#modalDeleteBtn', function (event) {
      _this.onDeleteImage();
    });
  }


  showModal(id) {
    this.elementId = +id;
    $("#modalDeleteContent").modal("show");
  }

  subscribeToImageService() {
    this.imageServiceSub = this.imageService.manyImagesSubject.subscribe(
      (emittedData: CVImage[]) => {
        this.logos = emittedData;
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
          $("#logo" + this.elementId).remove();
        } else {
          console.log("not deleted");
        }
      }, (errorReject) => {
        console.log("error occured");
      }
    );
  }

}
