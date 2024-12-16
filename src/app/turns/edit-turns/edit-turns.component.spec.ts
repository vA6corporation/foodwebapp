import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTurnsComponent } from './edit-turns.component';

describe('EditTurnsComponent', () => {
  let component: EditTurnsComponent;
  let fixture: ComponentFixture<EditTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTurnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
