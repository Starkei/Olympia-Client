import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { Field } from 'src/app/engine/interfaces/field';

@Directive({
  selector: '[lower][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: LowerThenDirective, multi: true }]
})
export class LowerThenDirective {
  @Input()
  lower: Field;

  validate(c: FormControl): { [key: string]: any } {
    if (!c || !this.lower.innerText)
      return null;
    let a, b;
    let r = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/im;

    if (r.test(c.value)) {
      a = c.value.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
      b = this.lower.innerText.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
    }
    else {
      a = Number.parseInt(c.value);
      b = Number.parseInt(this.lower.innerText);
    }
    return (a < b) ? { "lowerT": true } : null;
  }
}
