import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketsComponent } from './change-tickets.component';

describe('ChangeTicketsComponent', () => {
  let component: ChangeTicketsComponent;
  let fixture: ComponentFixture<ChangeTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
