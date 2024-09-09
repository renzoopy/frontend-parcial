import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoFormularioComponent } from './formulario.component';

describe('TurnoFormularioComponent', () => {
  let component: TurnoFormularioComponent;
  let fixture: ComponentFixture<TurnoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
