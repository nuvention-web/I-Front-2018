import { TestBed, inject } from '@angular/core/testing';

import { SuveryResultService } from './suvery-result.service';

describe('SuveryResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuveryResultService]
    });
  });

  it('should be created', inject([SuveryResultService], (service: SuveryResultService) => {
    expect(service).toBeTruthy();
  }));
});
