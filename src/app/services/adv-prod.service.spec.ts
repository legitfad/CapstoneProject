import { TestBed } from '@angular/core/testing';

import { AdvProdService } from './adv-prod.service';

describe('AdvProdService', () => {
  let service: AdvProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
