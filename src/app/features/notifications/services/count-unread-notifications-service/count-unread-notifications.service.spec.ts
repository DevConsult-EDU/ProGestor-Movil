import { TestBed } from '@angular/core/testing';

import { CountUnreadNotificationsService } from './count-unread-notifications.service';

describe('CountUnreadNotificationsService', () => {
  let service: CountUnreadNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountUnreadNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
