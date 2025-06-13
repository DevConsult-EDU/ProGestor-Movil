import { TestBed } from '@angular/core/testing';

import { TasksAiAnalysisService } from './tasks-ai-analysis.service';

describe('TasksAiAnalysisService', () => {
  let service: TasksAiAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksAiAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
