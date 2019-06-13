import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { Field } from 'src/app/engine/interfaces/field';

@Directive({
  selector: '[greater][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: GreaterThenDirective, multi: true }]
})
export class GreaterThenDirective {
  @Input()
  greater: Field;

  validate(c: FormControl): { [key: string]: any } {

    if (!c || !this.greater.innerText)
      return null;
    let r = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/im;

    let a, b;

    if (r.test(c.value)) {
      a = c.value.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
      b = this.greater.innerText.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
    }
    else {
      a = Number.parseInt(c.value);
      b = Number.parseInt(this.greater.innerText);
    }

    return (a > b) ? { "greaterTrue": true } : null;
  }
}
