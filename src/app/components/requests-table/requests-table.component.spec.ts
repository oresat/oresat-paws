import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsTable } from './requests-table.component';

describe('RequestsTable', () => {
  let component: RequestsTable;
  let fixture: ComponentFixture<RequestsTable>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsTable ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
