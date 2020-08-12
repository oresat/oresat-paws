import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu.component';

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Menu ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
