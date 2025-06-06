import { TestBed } from '@angular/core/testing';

import { FilterPreferencesService } from './filter-preferences.service';

describe('FilterPreferencesService', () => {
  let service: FilterPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
