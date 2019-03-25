export interface User {
  email: string;
  photoURL?: string;
  displayName?: string;
  uid?: string;
  dateBirth?: Date;
  sex?: string;
  phone: number;
  nameOrg?: string;
  activityOrg?: string;
  adresOrg?: string;
  role: string;
  chatId?: Array<string>;
  contacts?: Array<string>;
}
