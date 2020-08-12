import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPage } from './request.component';

describe('RequestPage', () => {
  let component: RequestPage;
  let fixture: ComponentFixture<RequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
