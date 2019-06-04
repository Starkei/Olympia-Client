import { Pipe, PipeTransform } from "@angular/core";
import { type } from "os";

@Pipe({
  name: "arrayFormatter"
})
export class ArrayFormatterPipe implements PipeTransform {
  transform(value: any, devider?: string): string {
    if (typeof value !== "object") return value;
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
