import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTechnologiesComponent } from './all-technologies/all-technologies.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';

const routes: Routes = [
  { path: "", component: AllTechnologiesComponent},
  { path: "add", component: AddTechnologyComponent},
  { path: ":id/edit", component: EditTechnologyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnologiesManagRoutingModule {
  constructor() {
    console.log("*****TechnologiesManagRoutingModule Imported*****");
  }
 }
