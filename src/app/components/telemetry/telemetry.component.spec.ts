import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryPage } from './telemetry.component';

describe('TelemetryPage', () => {
  let component: TelemetryPage;
  let fixture: ComponentFixture<TelemetryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelemetryPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
