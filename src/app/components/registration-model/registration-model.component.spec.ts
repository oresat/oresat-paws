import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationModel } from './registration-model.component';

describe('RegistrationModel', () => {
  let component: RegistrationModel;
  let fixture: ComponentFixture<RegistrationModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationModel ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
