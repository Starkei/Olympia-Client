import { ProductService } from "src/app/services/product/product.service";
import { ProductsConfig } from "./products/products-config";
import { PostFormConfigGenerator } from "./post-form-config-generator";
import { TableConfigGenerator } from "./table-config-generator";
import { Sports } from './sports/sports';
import { SportService } from 'src/app/services/sport/sport.service';
import { Users } from './users/users';
import { AuthService } from 'src/app/services/auth/Auth.service';
import { CrowdfundingService } from 'src/app/services/crowdfunding/crowdfunding.service';
import { Crowdfunding } from './crowdfunding/crowdfunding';
import { EventService } from 'src/app/services/event/event.service';
import { Events } from './events/events';
import { TrainingService } from 'src/app/services/training/training.service';
import { Trainigs } from './trainings/trainigs';

export class ConfigGenerator {
  productConfig: ProductsConfig;
  sportConfig: Sports;
  userConfig: Users;
  crowdfundingConfig: Crowdfunding;
  eventConfig: Events;
  trainingConfig: Trainigs;

  postFormConfigGenerator: PostFormConfigGenerator;
  tableConfigGenerator: TableConfigGenerator;

  constructor(
    productService: ProductService,
    sportService: SportService,
    userService: AuthService,
    crowdfundingService: CrowdfundingService,
    eventService: EventService,
    trainigService: TrainingService) {

    this.productConfig = new ProductsConfig(productService);
    this.sportConfig = new Sports(sportService);
    this.userConfig = new Users(userService);
    this.crowdfundingConfig = new Crowdfunding(crowdfundingService);
    this.eventConfig = new Events(eventService);
    this.trainingConfig = new Trainigs(trainigService);

    this.postFormConfigGenerator = new PostFormConfigGenerator(this.productConfig);
    this.tableConfigGenerator = new TableConfigGenerator(this.productConfig, this.sportConfig, this.userConfig, this.crowdfundingConfig, this.eventConfig, this.trainingConfig);
  }

  getPostFormConfigGenerator(): PostFormConfigGenerator {
    return this.postFormConfigGenerator;
  }

  getTableConfigGenerator(): TableConfigGenerator {
    return this.tableConfigGenerator;
  }
}
