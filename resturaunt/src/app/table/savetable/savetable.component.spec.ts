import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetableComponent } from './savetable.component';

describe('SavetableComponent', () => {
  let component: SavetableComponent;
  let fixture: ComponentFixture<SavetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavetableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
