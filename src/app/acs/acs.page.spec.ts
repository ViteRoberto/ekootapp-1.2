import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcsPage } from './acs.page';

describe('AcsPage', () => {
  let component: AcsPage;
  let fixture: ComponentFixture<AcsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
