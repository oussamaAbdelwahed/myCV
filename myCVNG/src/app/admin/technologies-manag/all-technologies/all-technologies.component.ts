import { Component, OnInit, OnDestroy } from '@angular/core';
import { TechnologyService } from '../../../webservices/technology.service';
import { Subscription } from 'rxjs/Subscription';
import { Technology } from '../../../models/technology';

declare const $: any;

@Component({
  selector: 'app-all-technologies',
  templateUrl: './all-technologies.component.html',
  styleUrls: ['./all-technologies.component.css']
})

export class AllTechnologiesComponent implements OnInit, OnDestroy {
  private technologyServiceSub: Subscription;
  public technologies: Technology[];
  public elementId = null;
  constructor(private technologyService: TechnologyService) { }

  ngOnInit() {
    this.subscribeToTechnologyService();
    this.technologyService.getAllTechs();
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on("click", "#modalDeleteBtn", function (event) {
      _this.onDeleteImage();
    });
  }

  ngOnDestroy() {
    this.technologyServiceSub.unsubscribe();
  }

  showModal(id) {
    this.elementId = +id;
    $("#modalDeleteContent").modal("show");
  }

  onDeleteImage() {
    this.technologyService.deleteTechnology(this.elementId).then(
      (resolvedData: boolean) => {
        if (resolvedData) {
          if (resolvedData) {
            $("#teche" + this.elementId).remove();
           }
        } else {
          console.log("not deleted");
        }
      },
      errorReject => {
        console.log("error occured");
      }
    );
  }

  subscribeToTechnologyService() {
    this.technologyServiceSub = this.technologyService.techSubject.subscribe(
      (emittedData: Technology[]) => {
          this.technologies = emittedData;
          $("#maskforloading").fadeOut(600);
      }, (error) => {
          $("#maskforloading").fadeOut(600);
      }
    );
  }

}
