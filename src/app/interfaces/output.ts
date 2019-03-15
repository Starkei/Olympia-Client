export interface Output {
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  imagePath?: string;

  getFormattedPrice(): string;
}
