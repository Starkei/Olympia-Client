import { TestBed } from "@angular/core/testing";

import { CardEatService } from "./CardEat.service";

describe("CardEatService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CardEatService = TestBed.get(CardEatService);
    expect(service).toBeTruthy();
  });
});
