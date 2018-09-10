import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesManagRoutingModule } from './images-manag-routing.module';

import { AllNavbarLogosComponent } from './all-navbar-logos/all-navbar-logos.component';
import { AllCertificationsComponent } from './all-certifications/all-certifications.component';
import { AllMeBigPicturesComponent } from './all-me-big-pictures/all-me-big-pictures.component';
import { AddImageComponent } from './add-image/add-image.component';
import { SharedModule } from '../../shared-modules/shared.module';
import { UpdateImageComponent } from './update-image/update-image.component';


@NgModule({
  imports: [
    CommonModule,
    ImagesManagRoutingModule,
    SharedModule
  ],
  declarations: [AllNavbarLogosComponent, AllCertificationsComponent, AllMeBigPicturesComponent, AddImageComponent, UpdateImageComponent]
})
export class ImagesManagModule {
  constructor() {
    console.log("******ImagesManagModule <Lazy Loaded>******");
  }
}
