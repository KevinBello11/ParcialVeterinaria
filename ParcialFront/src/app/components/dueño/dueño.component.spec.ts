import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueñoComponent } from './dueño.component';

describe('DuenoComponent', () => {
  let component: DueñoComponent;
  let fixture: ComponentFixture<DueñoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DueñoComponent]
    });
    fixture = TestBed.createComponent(DueñoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
