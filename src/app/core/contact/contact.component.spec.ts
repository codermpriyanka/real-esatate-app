import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctComponent } from './contact.component';

describe('ConatctComponent', () => {
  let component: ConatctComponent;
  let fixture: ComponentFixture<ConatctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConatctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConatctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
