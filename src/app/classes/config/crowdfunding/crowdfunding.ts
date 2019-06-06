import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';

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
        return null;
    }
}
