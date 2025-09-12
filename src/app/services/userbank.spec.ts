import { TestBed } from '@angular/core/testing';

import { Userbank } from './userbank';

describe('Userbank', () => {
  let service: Userbank;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userbank);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
