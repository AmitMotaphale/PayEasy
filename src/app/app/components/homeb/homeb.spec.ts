import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Homeb } from './homeb';

describe('Homeb', () => {
  let component: Homeb;
  let fixture: ComponentFixture<Homeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Homeb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Homeb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
