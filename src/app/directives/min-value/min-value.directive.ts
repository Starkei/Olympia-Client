import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[minValue][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MinValueDirective, multi: true }]
})
export class MinValueDirective {

  @Input()
  minValue: number;

  validate(c: FormControl): { [key: string]: any } {
    if (!c)
      return null;
    let v = c.value;
    return (v < this.minValue) ? { "minValue": true } : null;
  }

}
