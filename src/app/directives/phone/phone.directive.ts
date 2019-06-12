import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[phone][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }]
})
export class PhoneDirective {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    if (!c && !c.value)
      return null;
    if (c.value.trim() === "")
      return null;
    let r = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let result = r.test(c.value);
    return result ? null : { "phone": true };
  }

}
