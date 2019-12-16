import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElasticEntityComponent } from './elastic-entity.component';

describe('ElasticEntityComponent', () => {
  let component: ElasticEntityComponent;
  let fixture: ComponentFixture<ElasticEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElasticEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElasticEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
