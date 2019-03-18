import { Output } from "src/app/interfaces/output";

export class Sport implements Output {
  public title: string;
  public description: string;
  public image: string;
  public address: string;
  public contraindications: Array<string>;
  public phoneNumbers: Array<string>;
  public underground: string;
  public reference: string;
  public type: Array<string>;

  constructor(object: Sport) {
    this.title = object.title;
    this.description = object.description;
    this.image = object.image;
    this.address = object.address;
    this.contraindications = object.contraindications;
    this.phoneNumbers = object.phoneNumbers;
    this.underground = object.underground;
    this.reference = object.reference;
    this.type = object.type;
  }
}
