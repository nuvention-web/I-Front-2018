import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SanitizerPipe implements PipeTransform {
  constructor (private sanitzer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitzer.bypassSecurityTrustResourceUrl(url);
  }
}
