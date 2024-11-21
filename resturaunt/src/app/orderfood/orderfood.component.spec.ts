import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderfoodComponent } from './orderfood.component';

describe('OrderfoodComponent', () => {
  let component: OrderfoodComponent;
  let fixture: ComponentFixture<OrderfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderfoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
