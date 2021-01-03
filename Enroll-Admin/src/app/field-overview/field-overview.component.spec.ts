import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOverviewComponent } from './field-overview.component';

describe('FieldOverviewComponent', () => {
  let component: FieldOverviewComponent;
  let fixture: ComponentFixture<FieldOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
