import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoughtPropertyComponent } from './bought-property.component';

describe('BoughtPropertyComponent', () => {
  let component: BoughtPropertyComponent;
  let fixture: ComponentFixture<BoughtPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoughtPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoughtPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
