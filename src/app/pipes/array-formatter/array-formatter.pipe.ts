import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayFormatter"
})
export class ArrayFormatterPipe implements PipeTransform {
  transform(value: Array<any>, devider?: string): string {
    if (!devider) devider = ",";
    let strFormat: string = "";
    value.forEach(
      (element: any): void => {
        strFormat = strFormat.concat(element + devider + " ");
      }
    );
    strFormat = strFormat.substr(0, strFormat.length - 2);
    return strFormat;
  }
}
