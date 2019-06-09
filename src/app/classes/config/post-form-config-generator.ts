import { PostFormConfig } from "src/app/interfaces/configs/post-form-config";
import { ProductsConfig } from "./products/products-config";
import { Sports } from './sports/sports';
import { Users } from './users/users';
import { Crowdfunding } from './crowdfunding/crowdfunding';
import { Events } from './events/events';
import { Trainigs } from './trainings/trainigs';

export class PostFormConfigGenerator {
  constructor(
    private productConfig: ProductsConfig,
    private sportConfig: Sports,
    private userConfig: Users,
    private crowdfundingConfig: Crowdfunding,
    private eventConfig: Events,
    private trainingConfig: Trainigs) { }

  getProductsConfig(): PostFormConfig {
    return this.productConfig.getPostFormConfig();
  }

  getSportConfig(): PostFormConfig {
    return this.sportConfig.getPostFormConfig();
  }

  getUserConfig(): PostFormConfig {
    return this.userConfig.getPostFormConfig();
  }

  getCrowdfundingConfig(): PostFormConfig {
    return this.crowdfundingConfig.getPostFormConfig();
  }

  getEventConfig(): PostFormConfig {
    return this.eventConfig.getPostFormConfig();
  }

  getTrainingConfig(): PostFormConfig {
    return this.trainingConfig.getPostFormConfig();
  }

}
