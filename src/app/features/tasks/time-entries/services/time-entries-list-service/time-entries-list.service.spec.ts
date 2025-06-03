import { TestBed } from '@angular/core/testing';

import { TimeEntriesListService } from './time-entries-list.service';

describe('TimeEntriesListService', () => {
  let service: TimeEntriesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeEntriesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
