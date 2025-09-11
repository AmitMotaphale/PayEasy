import { TestBed } from '@angular/core/testing';

import { Merchant, MerchantService } from './merchant';

describe('Merchant', () => {
  let service: MerchantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
