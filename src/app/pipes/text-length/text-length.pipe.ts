import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "textLength"
})
export class TextLengthPipe implements PipeTransform {
  transform(value: string, args?: number): string {
    if (!value) return value;
    if (args === 0 || args >= value.length + 1) return value;
    value = value.substr(0, args);
    value = value.concat("...");
    return value;
  }
}
