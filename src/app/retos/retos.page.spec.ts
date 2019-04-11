import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetosPage } from './retos.page';

describe('RetosPage', () => {
  let component: RetosPage;
  let fixture: ComponentFixture<RetosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
