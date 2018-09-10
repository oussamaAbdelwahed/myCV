import { Component, OnInit, OnDestroy } from '@angular/core';
import { Formation } from '../../../models/formation';
import { Subscription } from 'rxjs/Subscription';
import { FormationService } from '../../../webservices/formations.service';
import { FormationType } from '../../../commontasks/imagetype.enum';
declare const $: any;
@Component({
  selector: "app-all-internship-attestations",
  templateUrl: "./all-internship-attestations.component.html",
  styleUrls: ["./all-internship-attestations.component.css"]
})
export class AllInternshipAttestationsComponent implements OnInit, OnDestroy {
  public attestations: Formation[];
  private formationServiceSub: Subscription;
  public elementId = null;
  constructor(private formationService: FormationService) {}

  ngOnInit() {
    this.subscribeToFormationService();
    this.formationService.getAllByType(FormationType.INTERNSHIP_ATTESTATION);
    $("#maskforloading").fadeIn(0);
    const _this = this;
    $(document).on("click", "#modalDeleteBtn", function (event) {
      _this.onDeleteImage();
    });
  }

  ngOnDestroy() {
    this.formationServiceSub.unsubscribe();
  }

  subscribeToFormationService() {
    this.formationServiceSub = this.formationService.formationSub.subscribe(
      (emittedData: Formation[]) => {
        this.attestations = emittedData;
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
          $("#atte" + this.elementId).remove();
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
