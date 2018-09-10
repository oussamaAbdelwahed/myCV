import { Component, OnInit, OnDestroy } from '@angular/core';
import { Formation } from '../../../models/formation';
import { FormationService } from '../../../webservices/formations.service';
import { Subscription } from 'rxjs/Subscription';
import { FormationType } from '../../../commontasks/imagetype.enum';
declare const $: any;

@Component({
  selector: "app-all-diplomes",
  templateUrl: "./all-diplomes.component.html",
  styleUrls: ["./all-diplomes.component.css"]
})
export class AllDiplomesComponent implements OnInit, OnDestroy {
  public diplomas: Formation[];
  private formationServiceSub: Subscription;
  public elementId = null;
  constructor(private formationService: FormationService) {}

  ngOnInit() {
    this.subscribeToFormationService();
    this.formationService.getAllByType(FormationType.DIPLOMA);
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on("click", "#modalDeleteBtn", function(event) {
      _this.onDeleteImage();
    });
  }

  ngOnDestroy() {
    this.formationServiceSub.unsubscribe();
  }

  subscribeToFormationService() {
    this.formationServiceSub = this.formationService.formationSub.subscribe(
      (emittedData: Formation[]) => {
        this.diplomas = emittedData;
        $("#maskforloading").fadeOut(600);
      }, (error) => {
        $("#maskforloading").fadeOut(600);
      }
    );
  }

  showModal(id) {
    this.elementId = +id;
    $("#modalDeleteContent").modal("show");
  }

  onDeleteImage() {
    this.formationService.deleteFormation(this.elementId).then(
      (resolvedData: boolean) => {
        if (resolvedData) {
          $("#dip" + this.elementId).remove();
        } else {
          console.log("not deleted");
        }
      },
      errorReject => {
        console.log("error occured");
      }
    );
  }

  isDocument(name: string): boolean {
    const ext = name.substr(name.lastIndexOf('.') + 1);
    if (ext === 'pdf' || ext === 'PDF') {
        return true;
    }
    return false;
  }
}
