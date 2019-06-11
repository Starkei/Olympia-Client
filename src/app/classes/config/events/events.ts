import { EventService } from 'src/app/services/event/event.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';
import { Group } from 'src/app/engine/interfaces/group';
import { FieldType } from 'src/app/engine/enums/field-type.enum';
import { Field } from 'src/app/engine/interfaces/field';

export class Events {
    constructor(private service: EventService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["title", "address", "description", "details", "image", "phoneNumbers", "time"],
            titles: ["Название", "Адрес", "Описание", "Детали", "Изображение", "Телефонные номера", "Время проведения"],
            allColumns: ["title", "address", "description", "details", "image", "phoneNumbers", "time"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.service.deleteDocuments.bind(this.service)
        };
        return config;
    }


    getPostFormConfig(): PostFormConfig {
        let inputForCreatePhoneNumber: Field = {
            fieldType: FieldType.input,
            inputType: "mobile",
            inputPlaceHolder: "Введите контактный номер",
        };

        let buttonForCreatePhoneNumber: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                for (const phone of phoneNumbers.selectItems) {
                    if (phone === inputForCreatePhoneNumber.innerText)
                        return inputForCreatePhoneNumber.innerText = "";
                }
                phoneNumbers.selectItems.push(
                    inputForCreatePhoneNumber.innerText,
                );
                phoneNumbers.values.push(inputForCreatePhoneNumber.innerText);
                inputForCreatePhoneNumber.innerText = "";
            }
        };

        let inputForCreateDetails: Field = {
            fieldType: FieldType.input,
            inputType: "text",
            inputPlaceHolder: "Введите деталь"
        };

        let buttonForCreateDetails: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                for (const detail of details.selectItems) {
                    if (detail === inputForCreateDetails.innerText)
                        return inputForCreateDetails.innerText = "";
                }
                details.selectItems.push(
                    inputForCreateDetails.innerText,
                );
                details.values.push(inputForCreateDetails.innerText);

                inputForCreateDetails.innerText = "";
            }
        };

        let inputForCreateDate: Field = {
            fieldType: "input",
            inputType: "datetime-local",
            inputPlaceHolder: "Введите дату проведения"
        };


        let buttonForCreateTime: Field = {
            fieldType: FieldType.button,
            title: "add",
            buttonType: "icon",
            onClick: () => {
                if (!inputForCreateDate.innerText)
                    return;
                for (const t of time.selectItems) {
                    if (t === inputForCreateDate.innerText) {
                        inputForCreateDate.innerText = "";
                        return;
                    }
                }
                time.selectItems.push(
                    inputForCreateDate.innerText
                );
                time.values.push(new Date(inputForCreateDate.innerText));
                inputForCreateDate.innerText = "";
            }
        };


        let phoneNumbers: Field = {
            fieldType: "list",
            selectItems: [],
            values: [],
            dbFieldName: ["phoneNumbers"]
        };

        let details: Field = {
            fieldType: "list",
            selectItems: [],
            values: [],
            dbFieldName: ["details"]
        };

        let time: Field = {
            fieldType: "list",
            selectItems: [],
            values: [],
            dbFieldName: ["time"]
        };

        let titleGroup: Group = {
            title: "Наименование",
            fields: [
                {
                    fieldType: "input",
                    inputPlaceHolder: "Наименование",
                    inputType: "text",
                    dbFieldName: ["title"],
                    required: true,
                }
            ]
        };

        let imageAndReference: Group = {
            title: "Изображение и адрес проведения",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "text",
                    inputPlaceHolder: "Адрес проведения",
                    dbFieldName: ["address"],
                    required: true
                },
                {
                    fieldType: FieldType.button,
                    buttonType: "file",
                    dbFieldName: ["image"],
                    pathToImages: "events/",
                },
            ]
        };

        let createPhoneNumbersGroup: Group = {
            title: "Добавление контактных данных",
            fields: [inputForCreatePhoneNumber, buttonForCreatePhoneNumber]
        }

        let phoneNumbersGroup: Group = {
            title: "Контактные данные",
            fields: [phoneNumbers]
        }

        let createDtailsGroup: Group = {
            title: "Добавление деталей мероприятия",
            fields: [inputForCreateDetails, buttonForCreateDetails]
        }

        let detailsGroup: Group = {
            title: "Детали мероприятия",
            fields: [details]
        }

        let createTimeGroup: Group = {
            title: "Добавление времени проведения",
            fields: [inputForCreateDate, buttonForCreateTime]
        }

        let timeGroup: Group = {
            title: "Время проведения",
            fields: [time]
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
            collectionName: "Мероприятия",
            groups: [
                titleGroup,
                imageAndReference,
                createPhoneNumbersGroup,
                phoneNumbersGroup,
                createDtailsGroup,
                detailsGroup,
                createTimeGroup,
                timeGroup,
                descriptionGroup
            ],
            onPost: this.service.addDocument.bind(this.service)
        };
        return config;
    }
}
