import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSportDialogComponent } from './add-sport-dialog.component';

describe('AddSportDialogComponent', () => {
  let component: AddSportDialogComponent;
  let fixture: ComponentFixture<AddSportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
