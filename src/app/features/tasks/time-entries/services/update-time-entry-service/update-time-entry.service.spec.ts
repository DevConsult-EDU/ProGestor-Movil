import { TestBed } from '@angular/core/testing';

import { UpdateTimeEntryService } from './update-time-entry.service';

describe('UpdateTimeEntryService', () => {
  let service: UpdateTimeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTimeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
