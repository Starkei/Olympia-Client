import { Component, OnInit } from "@angular/core";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { Adware } from "src/app/interfaces/models/adware";
import { AdwareService } from "src/app/services/adware/adware.service";
import { ProductService } from "src/app/services/product/product.service";
import { AuthService } from "src/app/services/auth/Auth.service";
import { Output } from "src/app/interfaces/output";
import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { PostFormConfigGenerator } from "src/app/classes/config/post-form-config-generator";
import { TableConfigGenerator } from "src/app/classes/config/table-config-generator";
import { ConfigGenerator } from "src/app/classes/config/config-generator";
import { SportService } from 'src/app/services/sport/sport.service';
import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { EventService } from 'src/app/services/event/event.service';
import { TrainingService } from 'src/app/services/training/training.service';

interface Collection {
  name: string;
  tableConfig: TableConfig;
  postFormConfig: PostFormConfig;
}

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.scss"]
})
export class AdminPanelComponent implements OnInit {
  collections: Array<Collection>;
  configGenerator: ConfigGenerator;

  constructor(
    public adwareService: AdwareService,
    public productService: ProductService,
    public sportService: SportService,
    public userService: AuthService,
    public crowdfundingService: CrowdfundingService,
    public eventService: EventService,
    public trainingService: TrainingService
  ) {
    this.configGenerator = new ConfigGenerator(this.productService, this.sportService, this.userService, this.crowdfundingService, this.eventService, this.trainingService);

    this.collections = [
      {
        name: "Товары",
        tableConfig: this.configGenerator.getTableConfigGenerator().getProductsConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      },
      {
        name: "Спорт.клубы",
        tableConfig: this.configGenerator.getTableConfigGenerator().getSportConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getSportConfig()
      },
      {
        name: "Пользователи",
        tableConfig: this.configGenerator.getTableConfigGenerator().getUserConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      },
      {
        name: "Краундфандинг",
        tableConfig: this.configGenerator.getTableConfigGenerator().getCrowdfundingConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      },
      {
        name: "Мероприятия",
        tableConfig: this.configGenerator.getTableConfigGenerator().getEventConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      },
      {
        name: "Тренинги",
        tableConfig: this.configGenerator.getTableConfigGenerator().getTrainingConfig(),
        postFormConfig: this.configGenerator.getPostFormConfigGenerator().getProductsConfig()
      }

    ];
  }

  ngOnInit() { }
}
