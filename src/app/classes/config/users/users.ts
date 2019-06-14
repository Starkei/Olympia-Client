import { AuthService } from 'src/app/services/auth/Auth.service';
import { TableConfig } from 'src/app/interfaces/configs/table-config';
import { PostFormConfig } from 'src/app/interfaces/configs/post-form-config';
import { Output } from 'src/app/interfaces/output';
import { Group } from 'src/app/engine/interfaces/group';
import { User } from 'src/app/interfaces/auth';

export class Users {

    constructor(private service: AuthService) { }

    getTableConfig(): TableConfig {
        let config: TableConfig = {
            displayColumns: ["email", "about", "dateBirth", "displayName", "image", "phone", "role", "sex", "userName"],
            titles: ["Электронный адрес", "О себе", "Дата рождения", "Имя", "Изображение", "Телефонный номер", "Роль", "Пол", "Псевдоним"],
            allColumns: ["email", "about", "dateBirth", "displayName", "image", "phone", "role", "sex", "userName"],
            showAll: this.service.getAllConvertedData.bind(this.service),
            onDelete: this.deleteUsers.bind(this)
        };
        return config;
    }

    getPostFormConfig(): PostFormConfig {

        let userNameGroup: Group = {
            title: "Псевдоним и пароль",
            fields: [
                {
                    fieldType: "input",
                    inputType: "text",
                    inputPlaceHolder: "Введите псевдоним пользователя",
                    dbFieldName: ["userName"],
                    required: true
                },
                {
                    fieldType: "input",
                    inputType: "password",
                    inputPlaceHolder: "Введите пароль",
                    dbFieldName: ["password"],
                    required: true
                }
            ]
        };

        let contactsGroup: Group = {
            title: "Контактная инфромация",
            fields: [
                {
                    fieldType: "input",
                    inputType: "email",
                    inputPlaceHolder: "Введите электронный адрес",
                    dbFieldName: ["email"],
                    required: true
                },
                {
                    fieldType: "input",
                    inputType: "mobile",
                    inputPlaceHolder: "Введите мобильный номер",
                    dbFieldName: ["phone"],
                }
            ]
        };

        let imageGroup: Group = {
            title: "Изображение пользователя",
            fields: [
                {
                    fieldType: "button",
                    buttonType: "file",
                    dbFieldName: ["image"],
                    pathToImages: "usersImages"
                }
            ]
        };

        let genderAndRoleGroup: Group = {
            title: "Пол и роль",
            fields: [
                {
                    fieldType: "radio",
                    selectItems: ["Мужчина", "Женщина"],
                    dbFieldName: ["sex"]
                },
                {
                    fieldType: "radio",
                    selectItems: ["User", "legalUser"],
                    dbFieldName: ["role"],
                    required: true
                }
            ]
        };

        let dateBirthGroup: Group = {
            title: "Дата рождения",
            fields: [
                {
                    fieldType: "date",
                    inputPlaceHolder: "Введите дату рождения",
                    dbFieldName: ["dateBirth"]
                }
            ]
        }

        let config: PostFormConfig = {
            collectionName: "Пользователи",
            groups: [
                userNameGroup,
                contactsGroup,
                imageGroup,
                genderAndRoleGroup,
                dateBirthGroup,
            ],
            onPost: this.addUser.bind(this)
        };
        return config;
    }

    addUser(data): void {
        this.service.doRegister({
            email: data.email,
            password: data.password
        }).then((d: any) => {
            this.service.updateDocument(data as User, d.user.uid);
        })
    }

    deleteUsers(dataForDelete: Array<Output>): void {
        let newData = [];
        for (const iterator of dataForDelete) {
            if (iterator["role"] && iterator["role"] === "Admin")
                continue;
            newData.push(iterator);
        }
        this.service.deleteDocuments(newData);
    }
}
