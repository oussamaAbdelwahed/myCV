import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormationsManagRoutingModule } from './formations-manag-routing.module';
import { SharedModule } from '../../shared-modules/shared.module';
import { AllDiplomesComponent } from './all-diplomes/all-diplomes.component';
import { AllInternshipAttestationsComponent } from './all-internship-attestations/all-internship-attestations.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';

@NgModule({
  imports: [
    CommonModule,
    FormationsManagRoutingModule,
    SharedModule
  ],
  declarations: [AllDiplomesComponent, AllInternshipAttestationsComponent, EditFormationComponent, AddFormationComponent]
})
export class FormationsManagModule {
  constructor() {
    console.log("*****FormationsManagModule*****");
  }
 }
