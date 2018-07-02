import { Component } from '@angular/core';
const enum ImageType {
  NAVBAR_LOGO = 'NAVBAR_LOGO',
  ME_BIG_PICTURE = 'ME_BIG_PICTURE',
  CERTIFICATION = 'CERTIFICATION'
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'app';
}
