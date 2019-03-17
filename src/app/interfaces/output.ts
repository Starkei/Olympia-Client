export interface Output {
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  image?: string;
  getFormattedPrice?(): string;
}
