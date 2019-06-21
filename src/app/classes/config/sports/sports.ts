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

        let undergrounds: Field = {
            fieldType: "radio",
            selectItems: [],
            dbFieldName: ["underground"],
        };
        let phoneNumbers: Field = {
            fieldType: "list",
            selectItems: [],
            values: [],
            dbFieldName: ["phoneNumbers"]
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
                if (!inputForCreateType.innerText) {
                    inputForCreateType.innerText = "";
                    return;
                }
                let value = inputForCreateType.innerText.trim().toLowerCase();
                if (typeGroup.fields.filter((val, index) => val.title.trim().toLowerCase() === value).length > 0) {
                    inputForCreateType.innerText = "";
                    return;
                }
                value = value.charAt(0).toUpperCase() + value.slice(1);
                typeGroup.fields.push(
                    {
                        fieldType: "checkbox",
                        title: value,
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

                if (!inputForCreateUnderground.innerText) {
                    inputForCreateUnderground.innerText = "";
                    return;
                }
                let value = inputForCreateUnderground.innerText.trim().toLowerCase();
                if (undergrounds.selectItems.filter((val, index) => val.trim().toLowerCase() === value).length > 0) {
                    inputForCreateUnderground.innerText = "";
                    return;
                }
                value = value.charAt(0).toUpperCase() + value.slice(1);

                undergrounds.selectItems.push(value);
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

                if (!inputForCreatePhoneNumber.innerText || inputForCreatePhoneNumber.isInvalid) {
                    inputForCreatePhoneNumber.innerText = "";
                    return;
                }
                let value = inputForCreatePhoneNumber.innerText;
                if (phoneNumbers.selectItems.filter((val, index) => val === value).length > 0) {
                    inputForCreatePhoneNumber.innerText = "";
                    return;
                }

                phoneNumbers.selectItems.push(
                    inputForCreatePhoneNumber.innerText,
                );
                phoneNumbers.values.push(inputForCreatePhoneNumber.innerText);
                inputForCreatePhoneNumber.innerText = "";
            }
        };

        this.service.getAllConvertedData().subscribe(data => {
            let types: Array<string> = this.getAllSportTypes(data);
            let tempUndergrounds: Array<string> = this.getAllUndergrounds(data);
            for (const element of types) {
                typeGroup.fields = typeGroup.fields.filter((field, index) => field.title !== element);
                typeGroup.fields.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["type"]
                });
            }
            for (const element of tempUndergrounds) {
                undergrounds.selectItems = undergrounds.selectItems.filter((el, index) => el !== element);
                undergrounds.selectItems.push(element);
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
                    dbFieldName: ["reference"],
                    required: true
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

        let gage: Field = {
            fieldType: FieldType.input
        };
        let lage: Field = {
            fieldType: FieldType.input,
            inputType: "number",
            inputPlaceHolder: "Возраст с",
            dbFieldName: ["age", "from"],
            minValue: 0,
            maxValue: 100,
            connectedField: gage,
            greater: true
        };
        gage.inputType = "number";
        gage.inputPlaceHolder = "Возраст до";
        gage.dbFieldName = ["age", "to"];
        gage.minValue = 0;
        gage.maxValue = 100;
        gage.connectedField = lage;
        gage.lower = true;

        let ageGroup: Group = {
            title: "Возрастная группа",
            fields: [
                lage, gage
            ]
        };

        let gGroup: Field = {
            fieldType: FieldType.input
        };
        let lGroup: Field = {
            ...{
                fieldType: FieldType.input,
                inputType: "number",
                inputPlaceHolder: "Количество с",
                dbFieldName: ["group", "from"],
                minValue: 1,
                connectedField: gGroup,
                greater: true
            }
        }

        gGroup.inputType = "number";
        gGroup.inputPlaceHolder = "Количество до";
        gGroup.dbFieldName = ["group", "to"];
        gGroup.minValue = 1;
        gGroup.connectedField = lGroup;
        gGroup.lower = true;

        let groupGroup: Group = {
            title: "Размер группы",
            fields: [
                lGroup, gGroup
            ]
        };

        let gTime: Field = {
            fieldType: FieldType.input
        };

        let lTime: Field = {
            ...{
                fieldType: FieldType.input,
                inputType: "time",
                inputPlaceHolder: "Начиная с",
                dbFieldName: ["timeWork", "from"],
                connectedField: gTime,
                greater: true
            }
        };
        gTime.inputType = "time";
        gTime.inputPlaceHolder = "Заканчивая до";
        gTime.dbFieldName = ["timeWork", "to"];
        gTime.connectedField = lTime;
        gTime.lower = true;

        let timeWorkGroup: Group = {
            title: "Время проведения",
            fields: [
                lTime, gTime
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
            fields: []
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
            fields: [undergrounds]
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
            onPost: this.addSport.bind(this)
        };
        return config;
    }

    addSport(data: Output): void {
        if (data.timeWork) {
            let time: any;

            if (data.timeWork.from) {
                time = data.timeWork.from;
                data.timeWork.from = time.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
            }
            if (data.timeWork.to) {
                time = data.timeWork.to;
                data.timeWork.to = time.split(":").reduce((h, m) => h * 60 * 60 + m * 60);
            }

        }
        this.service.addDocument(data);
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
