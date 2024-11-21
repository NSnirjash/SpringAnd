import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablebookingComponent } from './tablebooking.component';

describe('TablebookingComponent', () => {
  let component: TablebookingComponent;
  let fixture: ComponentFixture<TablebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablebookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
