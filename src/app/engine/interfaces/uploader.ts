export interface Uploader {
  uploadFile(file: File, path: string): void;
  downloadFile(url: string): File;
}
