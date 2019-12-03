import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticEntityComponent } from './static-entity.component';

describe('StaticEntityComponent', () => {
  let component: StaticEntityComponent;
  let fixture: ComponentFixture<StaticEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
