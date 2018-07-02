import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs/Subscription';
import { CVImage } from '../models/cvimage';
import { CVImageService } from '../webservices/cvimage.service';
import { ImageType } from '../commontasks/imagetype.enum';


declare var $: any;
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {
  private cvImageServiceSub: Subscription;
  public logo;
  public logoImageUrl;

  constructor(public cvImageService: CVImageService) {}

  ngOnInit() {
    this.subscribeToCVImageService();
    this.cvImageService.getOneImage(ImageType.NAVBAR_LOGO);
  }
  ngAfterViewInit() {
    const _this = this;
    _this.whenNavigating();

  }

  ngOnDestroy() {
    this.cvImageServiceSub.unsubscribe();
  }

  whenNavigating() {
    $(document).ready(function() {
      const gotoSkills = $("#aboutme").height() || $("#aboutme").css("height") ||
      $("#aboutme").offset().top || $("#aboutme").css("min-height");
      const skillsHeight = $("#skills").height() || $("#skills").css("height") ||
       $("#skills").offset().top || $("#skills").css("min-height");
      const techMastery = $("#technologymastery").height() || $("#skills").css("height") ||
        $("#skills").offset().top || $("#skills").css("min-height");
      const gotoContact = Number.parseFloat(gotoSkills) + Number.parseFloat(skillsHeight) + Number.parseFloat(techMastery);
      $("#gotoabout").click(function () {
        $("#licontact").removeClass("active");
        $("#liskills").removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        $("html, body").animate(
          {
            scrollTop: 0
          },
          "slow"
        );
      });
      /*link acceuil*/
      $("#gotoskills").click(function () {
        $("#liaboutme").removeClass("active");
        $("#licontact").removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        $("html, body").animate({ scrollTop: gotoSkills }, "slow");
      });

      /*link contact*/
      $("#gotocontact").click(function () {
        $("#liaboutme").removeClass("active");
        $("#liskills").removeClass("active");
        $(this)
          .parent()
          .addClass("active");
        $("html, body").animate(
          {
            scrollTop: gotoContact
          },
          "slow"
        );
      });
    });

  }
  subscribeToCVImageService() {
    this.cvImageServiceSub = this.cvImageService.singleImageSubject.subscribe(
      (emittedData: CVImage) => {
        this.logoImageUrl = emittedData.src;
        this.logo = emittedData;
      }
    );
  }
}


/*
);*/
 /*link about me*/
 /* let gotoSkills =
  document.documentElement.clientHeight ||
  document.body.clientHeight ||
  window.innerHeight;*/
