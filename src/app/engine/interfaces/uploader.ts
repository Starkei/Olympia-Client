export interface Uploader {
  uploadFile(file: File): void;
  downloadFile(url: string): File;
}
