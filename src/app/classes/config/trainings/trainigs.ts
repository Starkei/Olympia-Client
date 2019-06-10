import { TrainingService } from 'src/app/services/training/training.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';
import { Group } from 'src/app/engine/interfaces/group';
import { FieldType } from 'src/app/engine/enums/field-type.enum';

export class Trainigs {
    constructor(private service: TrainingService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["title", "leader", "description", "moreInfo", "image", "price", "currency"],
            titles: ["Название", "Руководитель", "Описание", "Подробнее", "Изображение", "Цена", "Валюта"],
            allColumns: ["title", "leader", "description", "moreInfo", "image", "price", "currency"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.service.deleteDocuments.bind(this.service)
        };
        return config;
    }


    getPostFormConfig(): PostFormConfig {
        let titleGroup: Group = {
            title: "Наименование и адрес",
            fields: [
                {
                    fieldType: "input",
                    inputPlaceHolder: "Наименование",
                    inputType: "text",
                    dbFieldName: ["title"],
                    required: true
                },
                {
                    fieldType: "input",
                    inputPlaceHolder: "Адрес",
                    inputType: "text",
                    dbFieldName: ["moreinfo"],
                    required: true
                }
            ]
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
            title: "Руководитель и страница сайта",
            fields: [
                {
                    fieldType: FieldType.input,
                    inputType: "text",
                    inputPlaceHolder: "Руководитель",
                    dbFieldName: ["leader"],
                    required: true
                },
                {
                    fieldType: FieldType.button,
                    buttonType: "file",
                    dbFieldName: ["image"],
                    pathToImages: "trainings/"
                },
            ]
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
            collectionName: "Тренинги",
            groups: [
                titleGroup,
                priceAndCurrency,
                imageAndReference,
                descriptionGroup
            ],
            onPost: this.service.addDocument.bind(this.service)
        };
        return config;
    }
}
