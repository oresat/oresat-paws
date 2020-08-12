import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertQueue } from './alert.component';

describe('AlertQueue', () => {
  let component: AlertQueue;
  let fixture: ComponentFixture<AlertQueue>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertQueue ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertQueue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
