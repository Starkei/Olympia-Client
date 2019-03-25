import { Field } from "src/app/interfaces/field";
import { FieldsFactory } from "../fields/fields-factory/fields-factory";
import { FieldType } from "src/app/enums/field-type.enum";

/**
 *
 *
 * @export
 * @class FieldGenerator
 */
export class FieldGenerator {
  constructor() {}

  /**
   *
   *
   * @protected
   * @param {Array<string>} titles Коллекция из заголовков для поля с типо "checkbox"
   * @returns {Array<Field>}
   * @memberof FieldGenerator
   */
  protected generateCheckBoxFields(titles: Array<string>): Array<Field> {
    let fields: Array<Field> = [];
    for (const title of titles) {
      fields.push(FieldsFactory.createFieldByType(FieldType.checkbox, title));
    }
    return fields;
  }

  /**
   *
   *
   * @protected
   * @param {Array<string>} placeHolders Коллекция из подсказок в поля типа 'input'
   * @returns {Array<Field>}
   * @memberof FieldGenerator
   */
  protected generateInputFields(placeHolders: Array<string>): Array<Field> {
    let fields: Array<Field> = [];
    for (const placeHolder of placeHolders) {
      fields.push(
        FieldsFactory.createFieldByType(FieldType.checkbox, "", placeHolder)
      );
    }

    return fields;
  }

  /**
   *
   * @description Создает только одно поле типа 'select' внутри коллекции
   * @protected
   * @param {Array<string>} selectItems Коллеция из значения пол типа 'select'
   * @returns {Array<Field>}
   * @memberof FieldGenerator
   */
  protected generateSelectField(selectItems: Array<string>): Array<Field> {
    let fields: Array<Field> = [];
    fields.push(
      FieldsFactory.createFieldByType(FieldType.select, "", "", selectItems)
    );

    return fields;
  }
}
