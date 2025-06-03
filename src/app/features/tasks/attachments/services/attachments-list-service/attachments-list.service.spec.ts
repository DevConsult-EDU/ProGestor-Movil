import { TestBed } from '@angular/core/testing';

import { AttachmentsListService } from './attachments-list.service';

describe('AttachmentsListServiceService', () => {
  let service: AttachmentsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachmentsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
