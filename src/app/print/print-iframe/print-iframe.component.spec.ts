import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintIframeComponent } from './print-iframe.component';

describe('PrintIframeComponent', () => {
  let component: PrintIframeComponent;
  let fixture: ComponentFixture<PrintIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintIframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
