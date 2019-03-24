import { isArray } from "util";
import { FieldGenerator } from "../field-generator/field-generator";
import { Filter } from "src/app/interfaces/filter";
import { Observable } from "rxjs";
import { Category } from "src/app/interfaces/category";

/**
 *
 * @param categories Поле из интерфейса Filter
 * @export
 * @class FilterGenerator
 * @template T Класс коллекции
 */
export class FilterGenerator<T> extends FieldGenerator implements Filter {
  categories: Observable<Array<Category>>;
  constructor() {
    super();
  }

  /**
   *
   *
   * @protected
   * @param {Array<T>} collection Коллекция из которой брать значения свойства
   * @param {string} propertyName Имя свойства
   * @returns {Set<string>} Возврашает множество из значений свойст коллекции
   * @memberof FilterGenerator
   */
  protected getSetOfPropertiesValues(
    collection: Array<T>,
    propertyName: string
  ): Set<string> {
    let values: Set<string> = new Set();

    for (const element of collection) {
      if (element.hasOwnProperty(propertyName))
        values.add(element[propertyName]);
    }

    return values;
  }

  /**
   *
   * @description Если значение свойства является массив, добавляет элементы этого массива во множество,
   * в противном случае просто добавляет значение во множество
   * @protected
   * @param {Array<T>} collection Коллекция из которой брать значения свойства
   * @param {string} propertyName Имя свойства
   * @returns {Set<string>} Возврашает множество из значений свойст коллекции
   * @memberof FilterGenerator
   */
  protected getSetFromArrayPropertiesValues(
    collection: Array<T>,
    propertyName: string
  ): Set<string> {
    let values: Set<string> = new Set();

    for (const element of collection) {
      if (element.hasOwnProperty(propertyName))
        if (isArray(element[propertyName])) {
          for (const item of element[propertyName]) {
            values.add(item);
          }
        } else values.add(element[propertyName]);
    }

    return values;
  }
}
