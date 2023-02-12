import { TestBed } from '@angular/core/testing';

import { DataFuncService } from './data-func.service';

describe('DataFuncService', () => {
  let service: DataFuncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFuncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
