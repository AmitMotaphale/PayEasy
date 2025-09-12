import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbankAccount } from './userbank-account';

describe('UserbankAccount', () => {
  let component: UserbankAccount;
  let fixture: ComponentFixture<UserbankAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbankAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserbankAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
