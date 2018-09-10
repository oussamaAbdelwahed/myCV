import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { SkillsComponent } from './skills/skills.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { CVImageService } from './webservices/cvimage.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MyInformationsService } from './webservices/myinformations.service';
import { FormationService } from './webservices/formations.service';
import { TechnologyMasteryComponent } from './technology-mastery/technology-mastery.component';
import { TechnologyService } from './webservices/technology.service';
import { ClientViewComponent } from './client-view/client-view.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared-modules/shared.module';
import { CredentialsInterceptor } from './admin/middlewares/credentials.interceptor';
import { LocalStorageService } from './webservices/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutmeComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    TechnologyMasteryComponent,
    ClientViewComponent,
    NotFoundComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule],
  providers: [
    HttpClient,
    CVImageService,
    MyInformationsService,
    FormationService,
    LocalStorageService,
    TechnologyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log("AppModule");
  }
}
