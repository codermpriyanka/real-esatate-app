import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPurchaseComponent } from './buyer-purchase.component';

describe('BuyerPurchaseComponent', () => {
  let component: BuyerPurchaseComponent;
  let fixture: ComponentFixture<BuyerPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
