import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { SportService } from 'src/app/services/sport/sport.service';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';
import { Field } from 'src/app/engine/interfaces/field';
import { Group } from 'src/app/engine/interfaces/group';
import { FieldType } from 'src/app/engine/enums/field-type.enum';
import { Output } from 'src/app/interfaces/output';

export class Sports {

    constructor(private service: SportService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["address", "area", "currency", "description", "image", "phoneNumbers", "price", "reference", "sex", "title", "type", "underground"],
            titles: ["Адресс", "Площадь", "Валюта", "Описание", "Изображение", "Телефонный номер", "Цена", "Ссылка", "Пол", "Наименование", "Тип", "Метро"],
            allColumns: ["address", "ageFrom", "ageTo", "groupFrom", "groupTo", "timeWorkFrom", "timeWorkTo", "area", "currency", "description", "image", "phoneNumbers", "price", "reference", "sex", "title", "type", "underground"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.service.deleteDocuments.bind(this.service)
        };
        return config;
    }

    getPostFormConfig(): PostFormConfig {

        let sportTypes: Array<Field> = [];
        let undergrounds: Array<Field> = [];
        let phoneNumbers: Field = {
            fieldType: "list",
            selectItems: []
        };

        let inputForCreateType: Field = {
            fieldType: FieldType.input,
            inputType: "text",
            inputPlaceHolder: "Введите наименование типа"
        };
        let buttonForCreateType: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                sportTypes.push(
                    {
                        fieldType: "checkbox",
                        title: inputForCreateType.innerText,
                        dbFieldName: ["type"]
                    }
                )
                inputForCreateType.innerText = "";
            }
        };

        let inputForCreateUnderground: Field = {
            fieldType: FieldType.input,
            inputType: "text",
            inputPlaceHolder: "Введите станцию метро"
        };

        let buttonForCreateUnderground: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                undergrounds.push(
                    {
                        fieldType: "checkbox",
                        title: inputForCreateUnderground.innerText,
                        dbFieldName: ["underground"]
                    }
                )
                inputForCreateUnderground.innerText = "";
            }
        };

        let inputForCreatePhoneNumber: Field = {
            fieldType: FieldType.input,
            inputType: "mobile",
            inputPlaceHolder: "Введите контактный номер"
        };

        let buttonForCreatePhoneNumber: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                for (const phone of phoneNumbers.selectItems) {
                    if (phone === inputForCreatePhoneNumber.innerText)
                        return inputForCreatePhoneNumber.control.setValue("");
                }
                phoneNumbers.selectItems.push(
                    inputForCreatePhoneNumber.innerText,
                );
                inputForCreatePhoneNumber.innerText = "";
            }
        };

        this.service.getAllConvertedData().subscribe(data => {
            let types: Array<string> = this.getAllSportTypes(data);
            let tempUndergrounds: Array<string> = this.getAllUndergrounds(data);
            for (const element of types) {
                sportTypes.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["type"]
                });
            }
            for (const element of tempUndergrounds) {
                undergrounds.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["undergrounds"]
                });
            }
        });

        let titleGroup: Group = {
            title: "Наименование",
            fields: [
                {
                    fieldType: "input",
                    inputPlaceHolder: "Наименование",
                    inputType: "text",
                    dbFieldName: ["title"],
                    required: true
                }
            ]
        };

        let addressAndAreaGroup: Group = {
            title: "Адрес и площадь",
            fields: [
                {
                    fieldType: "input",
                    inputPlaceHolder: "Адрес",
                    inputType: "text",
                    dbFieldName: ["address"],
                    required: true
                },
                {
                    fieldType: "input",
                    inputPlaceHolder: "Площадь",
                    inputType: "text",
                    dbFieldName: ["area"],
                }
            ]
        }

        let priceAndCurrency: Group = {
            title: "Цена и валюта",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputPlaceHolder: "Цена",
                    inputType: "number",
                    minValue: 0,
                    required: true,
                    dbFieldName: ["price"]
                },
                {
                    fieldType: FieldType.select,
                    selectItems: ["бел.руб", "y.e"],
                    inputPlaceHolder: "Валюта",
                    required: true,
                    dbFieldName: ["currency"]
                }
            ]
        };

        let imageAndReference: Group = {
            title: "Изображение и страница сайта",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "text",
                    inputPlaceHolder: "Адрес сайта",
                    dbFieldName: ["reference"]
                },
                {
                    fieldType: FieldType.button,
                    buttonType: "file",
                    dbFieldName: ["image"],
                    pathToImages: "sports/"
                },
            ]
        };

        let sexGroup: Group = {
            title: "Пол",
            fields: [
                {
                    fieldType: "checkbox",
                    title: "Мужчина",
                    dbFieldName: ["sex"]
                },
                {
                    fieldType: "checkbox",
                    title: "Женщина",
                    dbFieldName: ["sex"]
                }
            ]
        };



        let ageGroup: Group = {
            title: "Возрастная группа",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "number",
                    inputPlaceHolder: "Возраст с",
                    dbFieldName: ["age", "from"],
                    minValue: 0,
                    maxValue: 100
                },
                {
                    fieldType: FieldType.input,
                    inputType: "number",
                    inputPlaceHolder: "Возраст до",
                    dbFieldName: ["age", "to"],
                    minValue: 0,
                    maxValue: 100
                },
            ]
        };

        let groupGroup: Group = {
            title: "Размер группы",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "number",
                    inputPlaceHolder: "Количество с",
                    dbFieldName: ["group", "from"],
                    minValue: 1,
                },
                {
                    fieldType: FieldType.input,
                    inputType: "number",
                    inputPlaceHolder: "Количество до",
                    dbFieldName: ["group", "to"],
                    minValue: 1,
                },
            ]
        };

        let timeWorkGroup: Group = {
            title: "Время проведения",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "time",
                    inputPlaceHolder: "Начиная с",
                    dbFieldName: ["timeWork", "from"],
                },
                {
                    fieldType: FieldType.input,
                    inputType: "time",
                    inputPlaceHolder: "Заканчивая до",
                    dbFieldName: ["timeWork", "to"],
                },
            ]
        };

        let createTypeGroup: Group = {
            title: "Добавление вида спорта",
            fields: [
                inputForCreateType, buttonForCreateType
            ]
        }

        let typeGroup: Group = {
            title: "Виды спорта",
            fields: sportTypes
        }

        let createUndergroundGroup: Group = {
            title: "Добавление станции метро",
            fields: [
                inputForCreateUnderground,
                buttonForCreateUnderground
            ]
        }

        let undergroundGroup: Group = {
            title: "Станции метро",
            fields: undergrounds
        }

        let createPhoneNumberGroup: Group = {
            title: "Добавление контактного номера",
            fields: [
                inputForCreatePhoneNumber,
                buttonForCreatePhoneNumber
            ]
        }


        let phoneNumberGroup: Group = {
            title: "Ваши контактные номера",
            fields: [phoneNumbers]
        }

        let descriptionGroup: Group = {
            title: "Описание",
            fields: [
                {
                    fieldType: FieldType.textarea,
                    inputPlaceHolder: "Описание",
                    dbFieldName: ["description"]
                },
            ]
        }

        let config: PostFormConfig = {
            collectionName: "Спорт клубы и секции",
            groups: [
                titleGroup,
                addressAndAreaGroup,
                priceAndCurrency,
                imageAndReference,
                sexGroup,
                ageGroup,
                groupGroup,
                timeWorkGroup,
                createTypeGroup,
                typeGroup,
                createUndergroundGroup,
                undergroundGroup,
                createPhoneNumberGroup,
                phoneNumberGroup,
                descriptionGroup
            ],
            onPost: this.service.addDocument.bind(this.service)
        };
        return config;
    }

    private getAllSportTypes(collection: Array<Output>): Array<string> {
        let values: Set<string> = new Set();

        for (const element of collection) {
            for (const item of element["type"]) {
                values.add(item);
            }
        }

        return Array.from(values);
    }

    private getAllUndergrounds(collection: Array<Output>): Array<string> {
        let values: Set<string> = new Set();

        for (const element of collection) {
            values.add(element["underground"]);
        }

        return Array.from(values);
    }
}
