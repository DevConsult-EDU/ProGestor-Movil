import { TestBed } from '@angular/core/testing';

import { DownloadAttachmentService } from './download-attachment.service';

describe('DownloadAttachmentService', () => {
  let service: DownloadAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
