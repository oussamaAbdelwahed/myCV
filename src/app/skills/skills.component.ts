import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CVImageService } from '../webservices/cvimage.service';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { CVImage } from '../models/cvimage';
import { API_URL } from '../commontasks/imagetype.enum';
import { isNullOrUndefined } from 'util';


declare const $: any;

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  private windowWidth: number;
  private windowHeight: number;
  private imageServiceSub: Subscription;
  public certifications: CVImage[];
  public allCertifications: CVImage[];
  public isMobile;
  public isPc;
  public currentCertifIndex = 0;
  public currentCertif: CVImage = null;
  private carrouselIndex = 3;
  constructor(private imageSercive: CVImageService) {}

  ngOnInit() {
    this.isMobileDevice();
    this.documentHeightAndWidth();
    this.subscribeToImagesService();
    this.imageSercive.getAllCertifications();
  }

  ngOnDestroy() {
    this.imageServiceSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.onShowModal();
  }

  doSkillsBoxesAnimation() {
    $(function() {
      $(".innerskillmask").hide();
      $(".flexitem").hover(
        function(event) {
          $(this)
            .children(".innerskillmask")
            .removeClass("innerskillmaskanimatedout");
          $(this)
            .children(".innerskillmask")
            .show()
            .addClass("innerskillmaskanimatedin");
        },
        function(event) {
          $(this)
            .children(".innerskillmask")
            .removeClass("innerskillmaskanimatedin");
          $(this)
            .children(".innerskillmask")
            .addClass("innerskillmaskanimatedout");
        }
      );
    });
  }

  onShowModal() {
    $(document).on("click", ".btnmodalshow", function(e) {
      $(".innerskillmask").hide();
      $("#modaltargetappend").empty();
      const imgSrc = $(e.currentTarget)
        .parent()
        .prev()
        .attr("src");
      const imgAlt = $(e.currentTarget)
        .parent()
        .prev()
        .attr("alt");
      const img = $(
        '<img id="imginmodal" alt="' + imgAlt + '" src="' + imgSrc + '"/>'
      );
      $("#mymodalheadertext").text(imgAlt + "(taille réelle)");
      $("#linkmymodalheadertext").attr(
        "href",
        API_URL +
          "/images/" +
          $(e.currentTarget)
            .parent()
            .prev()
            .attr("id")
      );
      $("#modaltargetappend").append(img);
    });
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

  subscribeToImagesService() {
    this.imageServiceSub = this.imageSercive.manyImagesSubject.subscribe(
      (emittedData: CVImage[]) => {
        this.currentCertif = emittedData[0];
        this.allCertifications = emittedData;
        this.certifications = emittedData.slice(0, 3);
        this.doSkillsBoxesAnimation();
      }
    );
  }

  isMobileDevice() {
    this.isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase()
    );
    this.isPc = !this.isMobile;
  }
  createImageFromCVImage(certif: CVImage) {
    return $(
      '<img class="imgcertif" alt="' +
        certif.alt +
        '" src="' +
        certif.src +
        '" id="' +
        certif.name +
        '"/>'
    );
  }

  createCertificationBox(certif: CVImage) {
    const certifBox = $('<div class="col-lg-3 col-xs-12 flexitem"></div>');
    const certifImage = this.createImageFromCVImage(certif);
    const mask = $('<div class="innerskillmask"></div>');
    const certifDesc = $(
      '<p class="certifdetailstext">' + certif.description + "</p>"
    );
    mask.append(certifDesc);
    certifBox.append(certifImage);
    certifBox.append(mask);
    return certifBox;
  }

  onClickNextCertif() {
    console.log(this.currentCertifIndex + 1);
    $(".innerskillmask").hide();
    if (! isNullOrUndefined(this.allCertifications[this.currentCertifIndex + 1] )) {
      $("#previousarrowxs").show();
      const nextCertif = this.allCertifications[this.currentCertifIndex + 1];
      const image = this.createImageFromCVImage(nextCertif);
      $("img#crtf" + this.currentCertif.name).replaceWith(image);
      this.currentCertif = nextCertif;
      $("#singlecertifdescription").html(
        this.allCertifications[this.currentCertifIndex + 1].description
      );
      if (this.currentCertifIndex + 1 === this.allCertifications.length - 1) {
        $("#previousarrowxs").show();
        $("#nextarrowxs").hide();
      }
      this.currentCertifIndex++;
    }
    setTimeout(function() {
      $(".innerskillmask").show();
    }, 1000);
  }

  onClickPreviousCertif() {
    console.log(this.currentCertifIndex - 1);
    $(".innerskillmask").hide();
    if (!isNullOrUndefined(this.allCertifications[this.currentCertifIndex - 1])) {
      $("#nextarrowxs").show();
      const previousCertif = this.allCertifications[this.currentCertifIndex - 1];
      const image = this.createImageFromCVImage(previousCertif);
      $("img#crtf" + this.currentCertif.name).replaceWith(image);
      this.currentCertif = previousCertif;
      $("#singlecertifdescription").html(
        this.allCertifications[this.currentCertifIndex - 1].description
      );
      if (this.currentCertifIndex - 1 === 0) {
        $("#nextarrowxs").show();
        $("#previousarrowxs").hide();
      }
      this.currentCertifIndex--;
    }
  }


  getNextCertifs() {
    if (!isNullOrUndefined(this.allCertifications[this.carrouselIndex])) {
      const toShowCertifs = this.allCertifications.slice(this.carrouselIndex, this.carrouselIndex + 3);
      this.carrouselIndex += 3;
      const _this = this;
        $(".flexitem").fadeOut(600, function() {
          _this.certifications = toShowCertifs;
          _this.doSkillsBoxesAnimation();
        });
    }
  }

  getPreviousCertifs() {
    if (!isNullOrUndefined(this.allCertifications[this.carrouselIndex - 6])) {
      const toShowCertifs = this.allCertifications.slice(this.carrouselIndex - 6, this.carrouselIndex - 3);
      const _this = this;
      this.carrouselIndex -= 3;

      $('.flexitem').fadeOut(600, function() {
        _this.certifications = toShowCertifs;
        _this.doSkillsBoxesAnimation();
      });
    }
  }
}



