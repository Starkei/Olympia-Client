import { Field } from "./field";

/**
 *
 * @description {dataFiledName} по этому полю будут фильроваться данные
 * @param title - Является названием категории
 * @param fields - Является коллекцией из полей
 * @param dataFiledName - Является название поля в базе данных
 * @export
 * @interface Category
 */
export interface Category {
  title: string;
  fields: Array<Field>;
  dataFieldName?: string;
}
