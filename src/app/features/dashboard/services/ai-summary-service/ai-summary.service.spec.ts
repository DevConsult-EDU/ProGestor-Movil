import { TestBed } from '@angular/core/testing';

import { AiSummaryService } from './ai-summary.service';

describe('AiSummaryService', () => {
  let service: AiSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
