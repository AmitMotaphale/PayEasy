import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEcommerceComponents} from './ecommerce';

describe('Ecommerce', () => {
  let component: ProductEcommerceComponents;
  let fixture: ComponentFixture<ProductEcommerceComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEcommerceComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEcommerceComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
