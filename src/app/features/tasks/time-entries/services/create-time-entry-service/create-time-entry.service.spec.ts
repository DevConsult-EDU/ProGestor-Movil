import { TestBed } from '@angular/core/testing';

import { CreateTimeEntryService } from './create-time-entry.service';

describe('CreateTimeEntryService', () => {
  let service: CreateTimeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTimeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
