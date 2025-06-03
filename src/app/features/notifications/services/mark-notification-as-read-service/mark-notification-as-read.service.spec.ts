import { TestBed } from '@angular/core/testing';

import { MarkNotificationAsReadService } from './mark-notification-as-read.service';

describe('MarkNotificationAsReadService', () => {
  let service: MarkNotificationAsReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkNotificationAsReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
