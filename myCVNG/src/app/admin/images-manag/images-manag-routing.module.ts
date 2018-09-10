import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllNavbarLogosComponent } from './all-navbar-logos/all-navbar-logos.component';
import { AllCertificationsComponent } from './all-certifications/all-certifications.component';
import { AllMeBigPicturesComponent } from './all-me-big-pictures/all-me-big-pictures.component';
import { AddImageComponent } from './add-image/add-image.component';
import { UpdateImageComponent } from './update-image/update-image.component';



const routes: Routes = [
  {path: "navbar-logos", component: AllNavbarLogosComponent},
  {path: "me-big-pictures", component: AllMeBigPicturesComponent},
  {path: "certifications", component: AllCertificationsComponent},
  {path: "add", component: AddImageComponent},
  {path: ":id/edit", component: UpdateImageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesManagRoutingModule {
  constructor() {
    console.log("******ImagesManagRoutingModule <Imported By the Lazy Loaded>******");
  }
}
