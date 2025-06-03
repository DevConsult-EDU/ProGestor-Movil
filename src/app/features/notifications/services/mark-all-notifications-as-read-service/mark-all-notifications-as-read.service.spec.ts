import { TestBed } from '@angular/core/testing';

import { MarkAllNotificationsAsReadService } from './mark-all-notifications-as-read.service';

describe('MarkAllNotificationsAsReadService', () => {
  let service: MarkAllNotificationsAsReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkAllNotificationsAsReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
