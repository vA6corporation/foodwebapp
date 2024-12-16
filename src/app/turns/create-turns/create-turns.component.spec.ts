import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTurnsComponent } from './create-turns.component';

describe('CreateTurnsComponent', () => {
  let component: CreateTurnsComponent;
  let fixture: ComponentFixture<CreateTurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTurnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
