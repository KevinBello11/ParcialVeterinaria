import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueniosComponent } from './duenios.component';

describe('DueniosComponent', () => {
  let component: DueniosComponent;
  let fixture: ComponentFixture<DueniosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DueniosComponent]
    });
    fixture = TestBed.createComponent(DueniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
