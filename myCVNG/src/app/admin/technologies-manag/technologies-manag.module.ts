import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnologiesManagRoutingModule } from './technologies-manag-routing.module';
import { SharedModule } from '../../shared-modules/shared.module';
import { AllTechnologiesComponent } from './all-technologies/all-technologies.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { EditTechnologyComponent } from './edit-technology/edit-technology.component';

@NgModule({
  imports: [
    CommonModule,
    TechnologiesManagRoutingModule,
    SharedModule
  ],
  declarations: [AllTechnologiesComponent, AddTechnologyComponent, EditTechnologyComponent]
})
export class TechnologiesManagModule {
    constructor() {
    console.log("*****TechnologiesManagModule*****");
  }
}
