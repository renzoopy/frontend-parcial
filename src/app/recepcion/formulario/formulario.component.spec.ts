import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionFormularioComponent } from './formulario.component';

describe('RecepcionFormularioComponent', () => {
  let component: RecepcionFormularioComponent;
  let fixture: ComponentFixture<RecepcionFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
