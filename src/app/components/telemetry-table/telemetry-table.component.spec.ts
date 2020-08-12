import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryTable } from './telemetry-table.component';

describe('TelemetryTable', () => {
  let component: TelemetryTable;
  let fixture: ComponentFixture<TelemetryTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelemetryTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelemetryTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
