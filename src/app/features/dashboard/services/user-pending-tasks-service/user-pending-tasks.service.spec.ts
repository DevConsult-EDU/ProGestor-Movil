import { TestBed } from '@angular/core/testing';

import { UserPendingTasksService } from './user-pending-tasks.service';

describe('UserPendingTasksService', () => {
  let service: UserPendingTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPendingTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
