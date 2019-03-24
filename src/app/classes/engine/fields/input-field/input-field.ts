import { Field } from "src/app/interfaces/field";
import { FieldType } from "src/app/enums/field-type.enum";

/**
 *
 * @param fieldType Тип поля "input"
 * @param innerText Хранит введенное значение в поле
 * @param inputPlaceHolder Подсказка в поле
 * @param inputType Храните тип поля "input" ("file", "text", "date", ...)
 * @export
 * @class InputField
 * @implements {Field}
 */
export class InputField implements Field {
  public fieldType: string;
  public innerText: string;

  constructor(public inputPlaceHolder: string, public inputType: string) {
    this.fieldType = FieldType.input;
    this.innerText = "";
  }
}
