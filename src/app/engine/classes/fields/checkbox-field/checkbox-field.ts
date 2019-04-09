import { Field } from "src/app/engine/interfaces/field";
import { FieldType } from "src/app/engine/enums/field-type.enum";

/**
 *
 * @param fieldType Тип поля "checkbox"
 * @param title Заголовок поля
 * @param checked Хранит статус поля
 * @export
 * @class CheckboxField
 * @implements {Field}
 */
export class CheckboxField implements Field {
  public fieldType: string;

  constructor(public title: string, public checked: boolean = false) {
    this.fieldType = FieldType.checkbox;
  }
}
