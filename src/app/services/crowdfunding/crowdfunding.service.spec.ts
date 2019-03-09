import { TestBed } from "@angular/core/testing";

import { CrowdfundingService } from "./crowdfunding.service";

describe("CrowdfundingService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CrowdfundingService = TestBed.get(CrowdfundingService);
    expect(service).toBeTruthy();
  });
});
