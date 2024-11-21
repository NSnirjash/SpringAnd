import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableapproveComponent } from './tableapprove.component';

describe('TableapproveComponent', () => {
  let component: TableapproveComponent;
  let fixture: ComponentFixture<TableapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableapproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
