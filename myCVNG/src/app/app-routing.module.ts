import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientViewComponent } from './client-view/client-view.component';
import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Routes = [
  { path: "", component: ClientViewComponent },
  { path: "admin", loadChildren: './admin/admin.module#AdminModule'},
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() { console.log("AppRoutingModule"); }
}
