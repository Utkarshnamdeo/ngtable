import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {
  transform(value: any, except?: any): any {
    if (!value) {
      return value;
    }
    const copyObj = Object.assign({}, value);
    if (except) {
      delete copyObj[except];
    }
    return Object.keys(copyObj);
  }
}
