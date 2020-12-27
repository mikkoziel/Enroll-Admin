import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProfComponent } from './new-prof.component';

describe('NewProfComponent', () => {
  let component: NewProfComponent;
  let fixture: ComponentFixture<NewProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
