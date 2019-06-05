/**
 *
 * @param fieldType Является типом поля ('input', 'checkbox', 'select')
 * @param inputType Является типом поля input ('text', 'file' ...)
 * @param inputPlaceHolder Является подсказкой в поле input
 * @param title Является заголовком поля для поля с типом 'checkbox'
 * @param checked Хранит занчение состояние поля с типом 'checkbox'
 * @param innerText Хранит значение поля с типом  'input' или 'select'
 * @param selectItems Хранит набор значений для поля с типом 'select'
 *
 * @export
 * @interface Field
 */
export interface Field {
  fieldType: string;
  inputType?: string;
  //TODO: Change to "placeHolder"
  inputPlaceHolder?: string;
  title?: string;
  checked?: boolean;
  innerText?: string;
  selectItems?: Array<string>;

  //TODO: Document this
  dbFieldName?: Array<string>;
  minValue?: number;
  maxValue?: number;
  buttonType?: string;
  pathToImages?: string;
  onClick?: () => void;
  required?: boolean;
  isInvalid?: boolean;
}
