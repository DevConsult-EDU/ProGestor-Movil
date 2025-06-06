import { TestBed } from '@angular/core/testing';

import { DeleteTimeEntryService } from './delete-time-entry.service';

describe('DeleteTimeEntryService', () => {
  let service: DeleteTimeEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTimeEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
