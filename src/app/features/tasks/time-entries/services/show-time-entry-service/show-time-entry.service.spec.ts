import { TestBed } from '@angular/core/testing';

import { ShowTimeEntryService } from './show-time-entry.service';

describe('ShowTimeEntryService', () => {
  let service: ShowTimeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTimeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
