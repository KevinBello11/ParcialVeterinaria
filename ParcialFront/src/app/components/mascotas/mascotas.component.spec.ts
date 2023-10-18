import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasComponent } from './mascotas.component';

describe('MascotaComponent', () => {
  let component: MascotasComponent;
  let fixture: ComponentFixture<MascotasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasComponent]
    });
    fixture = TestBed.createComponent(MascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
