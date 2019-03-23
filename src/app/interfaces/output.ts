export interface Output {
  id?: string;
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  address?: string;
  contraindications?: Array<string>;
  phoneNumbers?: Array<string>;
  underground?: string;
  reference?: string;
  image?: string;
  type?: Array<string>;
  time?: Array<string>;
  usage?: Array<string>;
  details?: Array<string>;
  getFormattedPrice?(): string;
}
