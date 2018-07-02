import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './admin/login/login.component';
import { CVImageService } from './webservices/cvimage.service';
import { HttpClient, HttpClientModule } from '../../node_modules/@angular/common/http';
import { SafePipe } from './safe.pipe';
import { MyInformationsService } from './webservices/myinformations.service';
import { FormationService } from './webservices/formations.service';
import { FormsModule, ReactiveFormsModule } from "../../node_modules/@angular/forms";
import { TechnologyMasteryComponent } from './technology-mastery/technology-mastery.component';
import { TechnologyService } from './webservices/technology.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutmeComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    SafePipe,
    TechnologyMasteryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    CVImageService,
    MyInformationsService,
    FormationService,
    TechnologyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
