import { Pipe, PipeTransform, Sanitizer } from '@angular/core';
import { SafeStyle, SafeScript, SafeUrl, SafeResourceUrl, SafeHtml, DomSanitizer } from '../../node_modules/@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizier: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
        case 'html' : return this.sanitizier.bypassSecurityTrustHtml(value);
        case 'style' : return this.sanitizier.bypassSecurityTrustStyle(value);
        case 'script' : return this.sanitizier.bypassSecurityTrustScript(value);
        case 'url' : return this.sanitizier.bypassSecurityTrustUrl(value);
        case 'resourceUrl' : return this.sanitizier.bypassSecurityTrustResourceUrl(value);
        default: throw new Error('Inavlid safe type specified ${type}');
    }
  }

}
