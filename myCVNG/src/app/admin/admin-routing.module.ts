import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthMiddleware } from './middlewares/auth.guard';
import { LoginViewMiddleware } from './middlewares/login-view.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditInformationsComponent } from './edit-informations/edit-informations.component';
import { EditCredentialsComponent } from './edit-credentials/edit-credentials.component';



const routes: Routes = [
  { path: "login", component : LoginComponent, canActivate: [LoginViewMiddleware]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthMiddleware],
  children : [
     { path: "", component: WelcomeComponent},
     { path: "informations/edit", component: EditInformationsComponent},
     { path: "edit-credendials", component: EditCredentialsComponent},
     { path : "images", loadChildren : "app/admin/images-manag/images-manag.module#ImagesManagModule"},
     { path : "formations", loadChildren : "app/admin/formations-manag/formations-manag.module#FormationsManagModule"},
     { path: "technologies", loadChildren: "app/admin/technologies-manag/technologies-manag.module#TechnologiesManagModule"},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : []

})
export class AdminRoutingModule {
  constructor() {
    console.log("AdminRoutingModule [ imported by Lazy-Loaded Module (AdminModule)]");
  }
 }
