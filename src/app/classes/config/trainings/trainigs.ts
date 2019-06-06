import { TrainingService } from 'src/app/services/training/training.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';

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
        return null;
    }
}
