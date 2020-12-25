import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEnrollComponent } from './start-enroll.component';

describe('StartEnrollComponent', () => {
  let component: StartEnrollComponent;
  let fixture: ComponentFixture<StartEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEnrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
