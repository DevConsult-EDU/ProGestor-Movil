import { TestBed } from '@angular/core/testing';

import { DescriptionEnhancerService } from './description-enhancer.service';

describe('DescriptionEnhancerService', () => {
  let service: DescriptionEnhancerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionEnhancerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
