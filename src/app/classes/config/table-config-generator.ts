import { ProductsConfig } from "./products/products-config";
import { TableConfig } from "src/app/interfaces/configs/table-config";
import { Output } from "src/app/interfaces/output";
import { ProductService } from "src/app/services/product/product.service";
import { Sports } from './sports/sports';
import { Users } from './users/users';
import { Crowdfunding } from './crowdfunding/crowdfunding';
import { Events } from './events/events';
import { Trainigs } from './trainings/trainigs';

export class TableConfigGenerator {
  constructor(
    private productConfig: ProductsConfig,
    private sportConfig: Sports,
    private userConfig: Users,
    private crowdfundingConfig: Crowdfunding,
    private eventConfig: Events,
    private trainingConfig: Trainigs) { }

  getProductsConfig(): TableConfig {
    return this.productConfig.getTableConfig();
  }

  getSportConfig(): TableConfig {
    return this.sportConfig.getTableConfig();
  }

  getUserConfig(): TableConfig {
    return this.userConfig.getTableConfig();
  }

  getCrowdfundingConfig(): TableConfig {
    return this.crowdfundingConfig.getTableConfig();
  }

  getEventConfig(): TableConfig {
    return this.eventConfig.getTableConfig();
  }

  getTrainingConfig(): TableConfig {
    return this.trainingConfig.getTableConfig();
  }
}
