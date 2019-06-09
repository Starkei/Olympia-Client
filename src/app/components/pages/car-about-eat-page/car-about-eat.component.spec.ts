import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CarAboutEatComponent } from "./car-about-eat.component";
import { BannerComponent } from '../../shared/banner/banner.component';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { CardEatService } from 'src/app/services/card-eat/CardEat.service';

describe("CarAboutUsComponent", () => {
  let component: CarAboutEatComponent;
  let fixture: ComponentFixture<CarAboutEatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        CarAboutEatComponent,
        BannerComponent
      ],
      providers: [
        CardEatService
      ]
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
