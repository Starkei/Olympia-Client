export interface Output {
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  image?: string;
  leader?: string;

  getFormattedPrice?(): string;
}
