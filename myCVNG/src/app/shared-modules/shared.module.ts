import { NgModule, ModuleWithProviders } from '@angular/core';
import { LoginService } from '../webservices/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [SafePipe],
  exports: [ReactiveFormsModule, FormsModule, SafePipe, CommonModule],
})
export class SharedModule {

  public static forRoot(): ModuleWithProviders {
    /*util in case that The root (app.component.ts) component is  only
      interested with providers array(services injected) of this SharedModule
      and for example an other module is interested in declaration
      array (components, directives,pipes)
      in that case we must export them first
      then when importing this module from another module they will be available
     */
     return {
       ngModule: SharedModule,
       providers : [LoginService],
     };
  }
}
