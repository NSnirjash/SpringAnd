import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavefoodComponent } from './savefood.component';

describe('SavefoodComponent', () => {
  let component: SavefoodComponent;
  let fixture: ComponentFixture<SavefoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavefoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavefoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
