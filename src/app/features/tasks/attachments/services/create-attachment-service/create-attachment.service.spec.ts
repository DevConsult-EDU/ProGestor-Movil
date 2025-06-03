import { TestBed } from '@angular/core/testing';

import { CreateAttachmentService } from './create-attachment.service';

describe('CreateAttachmentService', () => {
  let service: CreateAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
