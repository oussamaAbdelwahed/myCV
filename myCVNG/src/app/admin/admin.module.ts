import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared-modules/shared.module';
import { LoginService } from '../webservices/login.service';
import { AuthMiddleware } from './middlewares/auth.guard';
import { LoginViewMiddleware } from './middlewares/login-view.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditInformationsComponent } from './edit-informations/edit-informations.component';
import { EditCredentialsComponent } from './edit-credentials/edit-credentials.component';
import { AdminService } from '../webservices/admin.service';

@NgModule({
  imports: [AdminRoutingModule, SharedModule],
  declarations: [LoginComponent, DashboardComponent, WelcomeComponent, EditInformationsComponent, EditCredentialsComponent, ],
  providers: [
    LoginService,
    AuthMiddleware,
    LoginViewMiddleware,
    AdminService
   ]
})
export class AdminModule {
  constructor() {
    console.log("AdminModule [Lazy-Loaded]");
  }
}
