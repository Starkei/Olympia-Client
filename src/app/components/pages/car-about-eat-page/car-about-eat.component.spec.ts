import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CarAboutEatComponent } from "./car-about-eat.component";

describe("CarAboutUsComponent", () => {
  let component: CarAboutEatComponent;
  let fixture: ComponentFixture<CarAboutEatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarAboutEatComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAboutEatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
