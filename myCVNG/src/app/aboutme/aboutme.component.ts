import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { CVImageService } from '../webservices/cvimage.service';
import { Subscription } from 'rxjs/Subscription';
import { CVImage } from '../models/cvimage';
import { ImageType, API_URL } from '../commontasks/imagetype.enum';
import { MyInformationsService } from '../webservices/myinformations.service';
import { MyInformations } from '../models/myinformations';
import { FormationService } from '../webservices/formations.service';
import { Formation } from '../models/formation';
declare const $: any;
@Component({
  selector: "app-aboutme",
  templateUrl: "./aboutme.component.html",
  styleUrls: ["./aboutme.component.css"]
})
export class AboutmeComponent implements OnInit, OnDestroy, AfterViewInit {
  private imageServiceSub: Subscription;
  private myInfosSub: Subscription;
  private formationsSub: Subscription;
  public myInfos: MyInformations = null;
  public formations: Formation[];
  private windowWidth: number;
  private windowHeight: number;
  public meBigPicture;
  public urlMyPicture;


  constructor(private imageService: CVImageService, private myInfosService: MyInformationsService,
     private formationService: FormationService) {}

  ngOnInit() {
    this.documentHeightAndWidth();
    this.myInfosService.getMyInformations();
    this.imageService.getOneImage(ImageType.ME_BIG_PICTURE);
    this.formationService.getAll();
    this.subscribeToImageService();
    this.subscribeToMyInfosService();
    this.subscribeToFormationService();
  }
  ngOnDestroy() {
     this.imageServiceSub.unsubscribe();
     this.myInfosSub.unsubscribe();
     this.formationsSub.unsubscribe();
  }
  ngAfterViewInit() {
    this.onShowModal();
  }

  documentHeightAndWidth(): void {
     this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
     this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
   setInterval(() => {
     this.windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
     this.windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }, 1000);
  }


  getHeight() {
    return this.windowHeight + 'px';
  }
  getWidth() {
    return this.windowWidth + 'px';
  }
  subscribeToImageService() {
    this.imageServiceSub = this.imageService.myImageSubject.subscribe(
      (emittedData: CVImage) => {
        $("#maskforloading").fadeOut(600);
        this.urlMyPicture = emittedData.src;
        this.meBigPicture = emittedData;
      }, (error) => {
        $("#maskforloading").fadeOut(600);
      }
    );
  }

  subscribeToMyInfosService() {
    this.myInfosSub = this.myInfosService.myInformationsSub.subscribe(
      (emittedData: MyInformations) => {
        this.myInfos = emittedData;
      }
    );
  }

  subscribeToFormationService() {
    this.formationsSub = this.formationService.formationSub.subscribe(
      (emittedData: Formation []) => {
        this.formations = emittedData;
      }
    );
  }

  onShowModal() {
    $(document).on('click', '.btnmodalshowwithformation', function (e) {
      const ide = $(e.currentTarget).attr('class');
      const name = ide.split(' ')[2];
      $('#modaltargetappend').empty();
      const imgSrc = $(e.currentTarget).attr('id');
      const imgAlt = $(e.currentTarget).text();
      const img = $('<img id="imginmodal" alt="' + imgAlt + '" src="' + imgSrc + '"/>');
      $('#mymodalheadertext').text(imgAlt);
      $("#linkmymodalheadertext").attr("href", API_URL + "/images/" + name);
      $('#modaltargetappend').append(img);
    });
  }

  isDocument(name: string): boolean {
    const ext = name.substr(name.lastIndexOf('.') + 1);
    if (ext === 'pdf' || ext === 'PDF') {
      return true;
    }
    return false;
  }
}
