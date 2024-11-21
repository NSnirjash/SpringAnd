import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallfoodComponent } from './viewallfood.component';

describe('ViewallfoodComponent', () => {
  let component: ViewallfoodComponent;
  let fixture: ComponentFixture<ViewallfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewallfoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewallfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
