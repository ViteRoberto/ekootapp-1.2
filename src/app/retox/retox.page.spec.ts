import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoxPage } from './retox.page';

describe('RetoxPage', () => {
  let component: RetoxPage;
  let fixture: ComponentFixture<RetoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetoxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
