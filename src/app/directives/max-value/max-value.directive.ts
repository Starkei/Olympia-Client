import { Directive, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { MinValueDirective } from '../min-value/min-value.directive';

@Directive({
  selector: '[maxValue][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MaxValueDirective, multi: true }]
})
export class MaxValueDirective {
  @Input()
  maxValue: number;

  validate(c: FormControl): { [key: string]: any } {
    if (!c)
      return null;
    let v = c.value;
    return (v > this.maxValue) ? { "maxValue": true } : null;
  }

}
