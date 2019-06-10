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
                productTypes.push({ fieldType: "checkbox", title: inputForCreateType.innerText, dbFieldName: ["type"] })
                inputForCreateType.innerText = "";
            }
        };

        let inputForCreateUsage: Field = { fieldType: FieldType.input, inputType: "text", inputPlaceHolder: "Введите тип использования" };
        let buttonForCreateUsage: Field = {
            fieldType: FieldType.button, title: "add", buttonType: "icon", onClick: () => {
                usage.push({ fieldType: "checkbox", title: inputForCreateType.innerText, dbFieldName: ["usage"] })
                inputForCreateUsage.innerText = "";
            }
        };

        let productTypes: Array<Field> = [

        ];

        let usage: Array<Field> = [

        ];

        this.service.getAllConvertedData().subscribe(data => {
            let types: Array<string> = this.getAllCrowdfundingTypes(data);
            for (const element of types) {
                productTypes.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["type"]
                });
            }
        });

        this.service.getAllConvertedData().subscribe(data => {
            let types: Array<string> = this.getAllCrowdfundingUsage(data);
            for (const element of types) {
                usage.push({
                    fieldType: "checkbox",
                    title: element,
                    dbFieldName: ["usage"]
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

        let typeCreation: Group = {
            title: "Добавление нового типа",
            fields: [
                inputForCreateType,
                buttonForCreateType
            ]
        }

        let typeGroup: Group = {
            title: "Типы",
            fields: productTypes
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
                    pathToImages: "productsImages/",
                },
            ]
        };
        let usageCreationGroup: Group = {
            title: "Добавление применения",
            fields: [inputForCreateUsage, buttonForCreateType]
        };
        let usageGroup: Group = {
            title: "Применение",
            fields: usage
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
