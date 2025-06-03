import { TestBed } from '@angular/core/testing';

import { NotificationsListService } from './notifications-list.service';

describe('NotificationsListService', () => {
  let service: NotificationsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
