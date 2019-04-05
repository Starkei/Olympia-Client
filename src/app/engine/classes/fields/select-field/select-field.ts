import { Field } from "src/app/engine/interfaces/field";
import { FieldType } from "src/app/engine/enums/field-type.enum";

/**
 *
 * @param fieldType Тип поля "select"
 * @param innerText Хранит значение выбранного елемента
 * @param selectItems Набор значений поля "select"
 * @export
 * @class SelectField
 * @implements {Field}
 */
export class SelectField implements Field {
  public fieldType: string;
  public innerText: string;

  constructor(public selectItems: Array<string>) {
    this.fieldType = FieldType.select;
    this.innerText = "";
  }
}
