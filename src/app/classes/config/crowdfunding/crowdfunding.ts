import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';
import { FieldType } from 'src/app/engine/enums/field-type.enum';
import { Field } from 'src/app/engine/interfaces/field';
import { Output } from 'src/app/interfaces/output';
import { Group } from 'src/app/engine/interfaces/group';

export class Crowdfunding {
    constructor(private service: CrowdfundingService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["title", "currency", "description", "image", "price", "type", "usage"],
            titles: ["Название", "Валюта", "Описание", "Изображение", "Цена", "Тип", "Использование"],
            allColumns: ["title", "currency", "description", "image", "price", "type", "usage"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.service.deleteDocuments.bind(this.service)
        };
        return config;
    }


    getPostFormConfig(): PostFormConfig {

        let inputForCreateType: Field = { fieldType: FieldType.input, inputType: "text", inputPlaceHolder: "Введите наименование типа" };
        let buttonForCreateType: Field = {
            fieldType: FieldType.button, title: "add", buttonType: "icon", onClick: () => {
                for (let index = 0; index < typeGroup.fields.length; index++) {
                    if (inputForCreateType.innerText.trim().toLowerCase() === typeGroup.fields[index].title.trim().toLowerCase())
                        return;
                }
                typeGroup.fields.push({ fieldType: "checkbox", title: inputForCreateType.innerText, dbFieldName: ["type"] })
                inputForCreateType.innerText = "";
            }
        };

        let inputForCreateUsage: Field = { fieldType: FieldType.input, inputType: "text", inputPlaceHolder: "Введите тип использования" };
        let buttonForCreateUsage: Field = {
            fieldType: FieldType.button, title: "add", buttonType: "icon", onClick: () => {
                for (let index = 0; index < usageGroup.fields.length; index++) {
                    if (inputForCreateUsage.innerText.trim().toLowerCase() === usageGroup.fields[index].title.trim().toLowerCase())
                        return;
                }
                usageGroup.fields.push({ fieldType: "checkbox", title: inputForCreateUsage.innerText, dbFieldName: ["usage"] })
                inputForCreateUsage.innerText = "";
            }
        };


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

        let typeCreation: Group = {
            title: "Добавление нового типа",
            fields: [
                inputForCreateType,
                buttonForCreateType
            ]
        }

        let typeGroup: Group = {
            title: "Типы",
            fields: []
        };

        let priceAndCurrency: Group = {
            title: "Цена и валюта",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputPlaceHolder: "Цена",
                    inputType: "number",
                    minValue: 0,
                    required: true,
                    dbFieldName: ["price"],
                },
                {
                    fieldType: FieldType.select,
                    selectItems: ["бел.руб", "y.e"],
                    inputPlaceHolder: "Валюта",
                    required: true,
                    dbFieldName: ["currency"],
                }
            ]
        };
        let imageAndReference: Group = {
            title: "Изображение и страница сайта",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "url",
                    inputPlaceHolder: "Адрес сайта",
                    dbFieldName: ["address"],
                },
                {
                    fieldType: FieldType.button,
                    buttonType: "file",
                    dbFieldName: ["image"],
                    pathToImages: "crowdfunding/",
                },
            ]
        };
        let usageCreationGroup: Group = {
            title: "Добавление применения",
            fields: [inputForCreateUsage, buttonForCreateUsage]
        };
        let usageGroup: Group = {
            title: "Применение",
            fields: []
        };

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

        this.service.getAllConvertedData().subscribe(data => {
            let types: Array<string> = this.getAllCrowdfundingTypes(data);
            let us: Array<string> = this.getAllCrowdfundingUsage(data);

            for (const element of types) {
                typeGroup.fields = typeGroup.fields.filter((field, index) => field.title !== element)
                typeGroup.fields.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["type"]
                });
            }

            for (const element of us) {
                usageGroup.fields = usageGroup.fields.filter((field, index) => field.title !== element)
                usageGroup.fields.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["usage"]
                });
            }
        });

        let config: PostFormConfig = {
            collectionName: "Краудфандинг",
            groups: [titleGroup, typeCreation, typeGroup, priceAndCurrency, imageAndReference, usageCreationGroup, usageGroup, descriptionGroup],
            onPost: this.service.addDocument.bind(this.service)
        };
        return config;
    }

    private getAllCrowdfundingTypes(collection: Array<Output>): Array<string> {
        let values: Set<string> = new Set();

        for (const element of collection) {
            for (const item of element["type"]) {
                values.add(item);
            }
        }

        return Array.from(values);
    }

    private getAllCrowdfundingUsage(collection: Array<Output>): Array<string> {
        let values: Set<string> = new Set();

        for (const element of collection) {
            for (const item of element["usage"]) {
                values.add(item);
            }
        }

        return Array.from(values);
    }
}
