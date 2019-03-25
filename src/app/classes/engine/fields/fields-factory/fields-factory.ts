import { Field } from "src/app/interfaces/field";
import { FieldType } from "src/app/enums/field-type.enum";
import { CheckboxField } from "../checkbox-field/checkbox-field";
import { InputField } from "../input-field/input-field";
import { SelectField } from "../select-field/select-field";

/**
 * @description Иммет статический метод createFieldByType который создает поле нужного типа
 *
 * @export
 * @class FieldsFactory
 */
export class FieldsFactory {
  /**
   *
   * @description Для генерации поля типа 'select' необходимо передать вторым и третьим параметром пустую строку
   * @example let field: Field = FieldsFactory.createFieldByType(FieldType.select, "", "", selectItems);
   * @static
   * @param {FieldType} fieldType Тип создаваемого поля
   * @param {string} title Заголово поля ('checkbox')
   * @param {string} [placeholder] Подсказка в поле ('input')
   * @param {Array<string>} [selectItems] Набор значение поля ('select')
   * @returns {Field}
   * @memberof FieldsFactory
   */
  public static createFieldByType(
    fieldType: FieldType,
    title?: string,
    placeholder?: string,
    selectItems?: Array<string>
  ): Field {
    switch (fieldType) {
      case FieldType.checkbox:
        return new CheckboxField(title);
      case FieldType.input:
        return new InputField(title, placeholder);
      case FieldType.select:
        return new SelectField(selectItems);
      default:
        return new InputField(title, placeholder);
    }
  }
}
