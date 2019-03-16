export interface Output {
  title?: string;
  description?: string;
  moreInfo?: string;
  price?: number;
  imagePath?: string;
  leader?: string;

  getFormattedPrice(): string;
}
