export interface Output {
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
  usage?: Array<string>;
  getFormattedPrice?(): string;
}
