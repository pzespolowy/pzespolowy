import { TestBed } from '@angular/core/testing';

import { AlbumDetailsService } from './album-details.service';

describe('AlbumDetailsService', () => {
  let service: AlbumDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
