export interface User {
  email: string;
  photoURL?: string;
  displayName?: string;
  uid?: string;
  dateBirth?: Date;
  sex?: string;
  phone?: number;
  nameOrg?: string;
  activityOrg?: string;
  adresOrg?: string;
  chatId?: Array<string>;
  contacts?: Array<string>;
  role?: string;
  money?: number;
  about?: string;
  image?: string;
  userName?: string;
  favoritesEvents?: Array<string>;
  favoriteProduct?: Array<string>;
  myEvents?: Array<string>;
  myTrainings?: Array<string>;
  mySports?: Array<string>;
  myProducts?: Array<string>;
}
