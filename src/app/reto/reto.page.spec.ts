import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetoPage } from './reto.page';

describe('RetoPage', () => {
  let component: RetoPage;
  let fixture: ComponentFixture<RetoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
