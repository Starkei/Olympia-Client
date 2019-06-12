import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[email][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailDirective, multi: true }]
})
export class EmailDirective {

  constructor() { }

  validate(c: FormControl): { [key: string]: any } {
    if (!c)
      return null;
    let r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/im;
    let result = r.test(c.value);
    return result ? null : { "email": true };
  }

}
