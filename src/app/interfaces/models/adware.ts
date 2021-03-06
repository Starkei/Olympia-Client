import { Output } from "@angular/compiler/src/core";

/**
 *
 * @description Model for adware in collection 'adware'
 * @param id - contains id of document
 * @param productId - contains product id from collection 'products'
 * @param userId - contains user id from collection 'user' (user should be legal)
 * @export
 * @interface Adware
 */
export interface Adware extends Output {
  id?: string;
  productId?: string;
  userId?: string;
}
