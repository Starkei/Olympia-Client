import { EventService } from 'src/app/services/event/event.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';

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
        return null;
    }
}
