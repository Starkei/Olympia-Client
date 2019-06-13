import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistsComponent } from './nutritionists.component';

describe('NutritionistsComponent', () => {
  let component: NutritionistsComponent;
  let fixture: ComponentFixture<NutritionistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
