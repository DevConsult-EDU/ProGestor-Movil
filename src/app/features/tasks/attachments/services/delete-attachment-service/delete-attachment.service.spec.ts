import { TestBed } from '@angular/core/testing';

import { DeleteAttachmentService } from './delete-attachment.service';

describe('DeleteAttachmentService', () => {
  let service: DeleteAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
