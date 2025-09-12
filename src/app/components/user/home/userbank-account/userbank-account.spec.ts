import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbankAccountComponent } from './userbank-account';

describe('UserbankAccount', () => {
  let component: UserbankAccountComponent;
  let fixture: ComponentFixture<UserbankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbankAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserbankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
