import { Output } from "src/app/interfaces/output";

export class Event implements Output {
  public id: string;
  public title: string;
  public description: string;
  public address: string;
  public image: string;
  public phoneNumbers: Array<string>;
  public time: Array<string>;
  public details: Array<string>;

  constructor(object: Event) {
    this.id = object.id;
    this.title = object.title;
    this.description = object.description;
    this.address = object.address;
    this.image = object.image;
    this.phoneNumbers = object.phoneNumbers;
    this.time = object.time;
    this.details = object.details;
  }
}
