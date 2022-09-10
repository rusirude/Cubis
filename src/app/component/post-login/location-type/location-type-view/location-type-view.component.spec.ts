import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTypeViewComponent } from './location-type-view.component';

describe('LocationTypeViewComponent', () => {
  let component: LocationTypeViewComponent;
  let fixture: ComponentFixture<LocationTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTypeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
