import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsComponent } from './turns.component';

describe('TurnsComponent', () => {
  let component: TurnsComponent;
  let fixture: ComponentFixture<TurnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
