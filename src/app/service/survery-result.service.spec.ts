import { TestBed, inject } from '@angular/core/testing';

import { SurveyResultService} from './survery-result.service';

describe('SuveryResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyResultService]
    });
  });

  it('should be created', inject([SurveyResultService], (service: SurveyResultService) => {
    expect(service).toBeTruthy();
  }));
});
