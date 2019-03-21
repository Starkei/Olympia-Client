import { Output } from "src/app/interfaces/output";

export class News implements Output {
  public id: string;
  public title: string;
  public description: string;
  public image: string;

  constructor(object: News) {
    this.title = object.title;
    this.description = object.description;
    this.image = object.image;
    this.id = object.id;
  }
}
