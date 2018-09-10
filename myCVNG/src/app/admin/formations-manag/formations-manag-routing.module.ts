import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDiplomesComponent } from './all-diplomes/all-diplomes.component';
import { AllInternshipAttestationsComponent } from './all-internship-attestations/all-internship-attestations.component';
import { EditFormationComponent } from './edit-formation/edit-formation.component';
import { AddFormationComponent } from './add-formation/add-formation.component';

const routes: Routes = [
  {path: "diplomes", component: AllDiplomesComponent},
  {path: "internship-attestations", component: AllInternshipAttestationsComponent},
  {path: ":id/edit", component : EditFormationComponent},
  {path: "add", component : AddFormationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationsManagRoutingModule {
  constructor() {
    console.log("*****FormationsManagRoutingModule Imported*****");
  }
}
