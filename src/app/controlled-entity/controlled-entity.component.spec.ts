import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlledEntityComponent } from './controlled-entity.component';

describe('ControlledEntityComponent', () => {
  let component: ControlledEntityComponent;
  let fixture: ComponentFixture<ControlledEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
