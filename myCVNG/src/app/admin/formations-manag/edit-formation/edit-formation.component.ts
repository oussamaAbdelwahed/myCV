import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Formation } from '../../../models/formation';
import { FormationService } from '../../../webservices/formations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
declare const $: any;
@Component({
  selector: "app-edit-formation",
  templateUrl: "./edit-formation.component.html",
  styleUrls: ["./edit-formation.component.css"]
})
export class EditFormationComponent implements OnInit {
  private formationServiceSub: Subscription;
  private formation: Formation;
  public formationTypes = ["DIPLOMA", "INTERNSHIP_ATTESTATION"];
  private selectedFile: File = null;
  private formationId = null;

  public editFormationForm: FormGroup;

  constructor(
    private formationService: FormationService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    $("#maskforloading").fadeIn(0);
    this.initForm();
    this.subscribeToFormationService();
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    this.activatedRoute.params.subscribe(
      (params) => {
         this.formationId  = +params['id'];
         this.formationService.getOneById(+params["id"]);
    });
  }

  subscribeToFormationService() {
    this.formationServiceSub = this.formationService.oneFormationSub.subscribe(
      (emittedData: Formation) => {
        $("#maskforloading").fadeOut(600);
        this.formation = emittedData;
        this.fillForm();
      },
      error => {
        $("#maskforloading").fadeOut(600);
        console.log(error);
      }
    );
  }

  initForm() {
    this.editFormationForm = this.formBuilder.group({
      type: ["", Validators.required],
      description: ["", Validators.required],
      proofDocument: [""]
    });
  }

  fillForm() {
    this.editFormationForm = this.formBuilder.group({
      type: [this.formation.type, Validators.required],
      description: [this.formation.description, Validators.required],
      proofDocument: [""]
    });
  }

  onChangeFile(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmitForm() {
    $("#maskforloading").fadeIn(0);
      const formValue = this.editFormationForm.value;
      const objForm = {};
      objForm['type'] = formValue["type"];
      objForm['description'] = formValue['description'];
      objForm['id'] = this.formationId;
      this.formationService.updateFormation(this.selectedFile, objForm).then(
        (resolvedData: boolean) => {
          $("#maskforloading").fadeOut(600);
            if (resolvedData) {
                this.location.back();
            }
        }, (rejected) => {
            $("#maskforloading").fadeOut(600);
        }
      );
  }
}
