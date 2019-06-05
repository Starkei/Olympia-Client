import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { SportService } from 'src/app/services/sport/sport.service';

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
}
