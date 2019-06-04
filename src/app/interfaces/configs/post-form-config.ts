import { Group } from "src/app/engine/interfaces/group";

export interface PostFormConfig {
  collectionName: string;
  groups: Array<Group>;
  onPost: (data: any) => void;
}
