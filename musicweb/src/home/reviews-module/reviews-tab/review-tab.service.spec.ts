import { TestBed } from '@angular/core/testing';

import { ReviewTabService } from './review-tab.service';

describe('ReviewTabService', () => {
  let service: ReviewTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
