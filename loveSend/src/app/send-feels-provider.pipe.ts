import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sendFeelsProvider'
})
export class SendFeelsProviderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
