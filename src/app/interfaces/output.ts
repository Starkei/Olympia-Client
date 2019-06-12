import { FromTo } from "./from-to";

/**
 * @description Все поля являются необязательными
 * @example let output: Output = {title: "Название"};
 * @param id Является id документа
 * @param title Строка хранящая название
 * @param description Является описанием документа
 * @param moreInfo Строка хранящая больше информации о документе
 * @param price Числовое значение отражающие цену
 * @param address Строка хранящая адрес
 * @param area Строка хранящая район
 * @param contraindications Коллекция хранящая противопоказания
 * @param phoneNumbers Коллекция хранящая телефонные номера
 * @param underground Строка хранящая раположение метро
 * @param reference Строка хранящая url страницы
 * @param image Строка хранящая url изображения
 * @param type Коллекция хранящая типы
 * @param time Коллекция хранящая время
 * @param usage Коллекция хранящая варианты использования
 * @param details Коллекция хранящая варианты детали о документе (почти как moreInfo)
 * @param currency Строка хранящая тип валюты
 * @param senderId Строка хранящая индефикатор отправителя
 * @param recipientId Строка хранящая индефикатор получателя
 * @param message Строка хранящая сообщение
 * @param sex Array wich contains available sex
 * @param timeWork FromTo type field which contains when work started and ended in seconds
 * @param age FromTo type field which contains available age
 * @param group FromTo type field which contains available amount of people
 * @export
 * @interface Output
 */
export interface Output {
  id?: string;
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  address?: string;
  contraindications?: Array<string>;
  phoneNumbers?: Array<string>;
  underground?: string;
  reference?: string;
  image?: string;
  leader?: string;
  area?: string;
  sex?: Array<string>;
  group?: FromTo<number>;
  timeWork?: FromTo<number>;
  age?: FromTo<number>;
  getFormattedPrice?(): string;
  type?: Array<string>;
  time?: Array<string>;
  usage?: Array<string>;
  details?: Array<string>;
  currency?: string;
  senderId?: string;
  recipientId?: string;
  message?: string;
  productId?: string;
  userId?: string;
  comment?: Array<any>;
}
