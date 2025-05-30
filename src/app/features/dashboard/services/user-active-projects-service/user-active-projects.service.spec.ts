import { TestBed } from '@angular/core/testing';

import { UserActiveProjectsService } from './user-active-projects.service';

describe('UserActiveProjectsService', () => {
  let service: UserActiveProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserActiveProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
