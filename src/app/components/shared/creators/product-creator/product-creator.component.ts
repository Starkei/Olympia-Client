import { Component, OnInit, ViewChild } from "@angular/core";
import { Creator } from "src/app/engine/classes/creator/creator";
import { ProductService } from "src/app/services/product/product.service";
import { Product } from "src/app/interfaces/models/product";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MatSelectionList, MatListOption } from "@angular/material";
import { UploaderService } from "src/app/services/uploader-service/uploader.service";

/**
 *
 * @description Пока является только модальным окном, для добавления товара в колекцию 'products'.
 * @export
 * @class ProductCreatorComponent
 * @extends {Creator<Product>}
 * @implements {OnInit}
 */
@Component({
  selector: "app-product-creator",
  templateUrl: "./product-creator.component.html",
  styleUrls: ["./product-creator.component.scss"]
})
export class ProductCreatorComponent extends Creator<Product> implements OnInit {
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  public product: Product;
  public file: File;
  public productTypes: string[];
  productCreationForm: FormGroup;

  /**
   * @description Создает сущность класса ProductCreatorComponent.
   * !!!Важно: Отправляет запрос в БД, на получение всех типов продуктов,
   * это завпрос на получение всех продуктов,может замедлить работу.
   * @param {ProductService} productService - Необходим для отправки запросов в БД
   * @param {UploaderService} upload - Необходим для отправки изображение в облако
   * @param {MatDialogRef<ProductCreatorComponent>} ref - Необходим для работы с модальным окном
   * @memberof ProductCreatorComponent
   */
  constructor(
    public productService: ProductService,
    public upload: UploaderService,
    public ref: MatDialogRef<ProductCreatorComponent>
  ) {
    //TODO: Оптимизировать запрос на выборку типов продукции, мб создать новую коллекцию из типов.
    //TODO: Добавить все поля продукта в обработчик.

    //Стандартный вызов супер конструктора класса {Creator}.
    super(productService);

    //Установка проверок на поля формы, а также свзявываение их с переменными внутри {productCreationForm}.
    this.productCreationForm = new FormGroup({
      //Обработчик поля {title}, на обязательность и минимальную длину 3.
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),

      //Обработчик поля {price}, на минимальную число 0, цена не может быть отрицательной.
      price: new FormControl("", [Validators.min(0)]),

      //Обработчик поля {description}.
      description: new FormControl(""),

      //Обработчик поля {firm}, на обязательность и минимальную длину 3.
      firm: new FormControl("", [Validators.required, Validators.minLength(3)]),

      //Обработчик поля {currency}, на обязательность и минимальную длину 3.
      currency: new FormControl("", [Validators.required]),

      //Обработчик поля {own_type}, на обязательность.
      own_type: new FormControl("", [Validators.required])
    });

    //Получение всех продуктов и выборки из них только типов.
    this.productService.getAllConvertedData<Product>().subscribe(
      (data: Array<Product>): void => {
        //Создание массива из множества типов.
        this.productTypes = Array.from(this.getSetFromArrayPropertiesValues(data, "type"));
      }
    );
  }

  /**
   *
   * @description Добавляет в БД введенный продукт, отправляет статус завершения окна.
   * !!!Важно: Отправляет на сохранение картнику
   * в облако, что может вызвать замедление работы, также после отправки изображения запрашивает
   * url картинки в хранилище.
   *
   * @memberof ProductCreatorComponent
   */
  public async add() {
    //TODO: Добавить проверку пустых полей.
    //TODO: Отправлять статус ошибки если модальное окно, не добавилдо запись.

    //Создает продукт на основе всех полей на форме.
    this.product = this.productCreationForm.value as Product;

    if (this.selectionList)
      this.product.type = Array.from(this.selectionList.selectedOptions.selected).map(
        (selection: MatListOption): string => {
          return selection.getLabel();
        }
      );
    //Сохранение изображения в удаленное хранилище, и получение его url.
    let url: string = await this.upload.uploadFile(this.file, "productsImages/");

    //Добавление url в продукт перед отправкой.
    this.product.image = url;

    //Отправка продукта в БД.
    this.create(this.product);

    //Закрытие модального окна.
    this.close("Добавлено");
  }

  public addOwnType(type: string): void {
    this.productTypes.push(type);
  }

  /**
   *
   * @description Отправляет статус завершение окна и закрывает его.
   * @param {string} [message="Закрыто"] - Сообщение о статусе окна.
   * @memberof ProductCreatorComponent
   */
  public close(message: string = "Закрыто"): void {
    //TODO: Создать перечисление из кодов завершения окна.
    this.ref.close(message);
  }

  /**
   *
   * @description Обрабатывает событие (change), устанавливает занчение {file} в первый элемент коллекции файлов.
   * @param {FileList} files - Коллекция файлов, хранит выбранные пользователем файлы.
   * @memberof ProductCreatorComponent
   */
  public setFile(files: FileList): void {
    //TODO: Сохранения все выбранных пользователем картинок.

    //Установка переменной {file} в первый элемент коллекции.
    this.file = files.item(0);
  }

  ngOnInit() {}
}
