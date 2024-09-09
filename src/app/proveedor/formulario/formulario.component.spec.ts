import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormularioComponent } from './formulario.component';

describe('ProveedorFormularioComponent', () => {
  let component: ProveedorFormularioComponent;
  let fixture: ComponentFixture<ProveedorFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
