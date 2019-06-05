import { AuthService } from 'src/app/services/auth/Auth.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';

export class Users {

    constructor(private service: AuthService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["email", "about", "dateBirth", "displayName", "image", "phone", "role", "sex", "userName"],
            titles: ["Электронный адрес", "О себе", "Дата рождения", "Имя", "Изображение", "Телефонный номер", "Роль", "Пол", "Псевдоним"],
            allColumns: ["email", "about", "dateBirth", "displayName", "image", "phone", "role", "sex", "userName"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.service.deleteDocuments.bind(this.service)
        };
        return config;
    }
}
