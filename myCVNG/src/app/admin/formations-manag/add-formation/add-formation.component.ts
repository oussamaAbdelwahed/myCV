import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { FormationService } from '../../../webservices/formations.service';
declare const $: any;
@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  public addFormationForm: FormGroup;
  private selectedFile: File = null;
  constructor(
     private formBuilder: FormBuilder,
     private location: Location,
     private formationService: FormationService) { }

  public formationTypes = ["DIPLOMA", "INTERNSHIP_ATTESTATION"];

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addFormationForm = this.formBuilder.group({
     "type": ["INTERNSHIP_ATTESTATION", Validators.required],
     "description": ["", Validators.required],
     "proofDocument" : ["", Validators.required]
    });
  }

  onChangeFile(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmitForm() {
    $("#maskforloading").fadeIn(0);
    const obj = {};
    obj['type'] = this.addFormationForm.value['type'];
    obj['description'] = this.addFormationForm.value['description'];
    this.formationService.saveFormation(this.selectedFile, obj).then(
       (resolvedData: boolean) => {
         $("#maskforloading").fadeOut(600);
         this.location.back();
       }, (rejectedData: boolean) => {
         $("#maskforloading").fadeOut(600);
       }
    );
  }

}

