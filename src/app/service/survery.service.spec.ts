import { TestBed, inject } from '@angular/core/testing';

import { SurveryService } from './survery.service';

describe('SurveryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveryService]
    });
  });

  it('should be created', inject([SurveryService], (service: SurveryService) => {
    expect(service).toBeTruthy();
  }));
});
