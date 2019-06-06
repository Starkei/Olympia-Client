import { TestBed } from '@angular/core/testing';
import { FileUploader } from './file-uploader';
import { AngularFireStorage } from '@angular/fire/storage';

describe("File", () => {

  let afs: AngularFireStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFireStorage]
    })
  })

  it("should create an instance", () => {
    afs = TestBed.get(AngularFireStorage);
    expect(new FileUploader(afs)).toBeTruthy();
  });
});
