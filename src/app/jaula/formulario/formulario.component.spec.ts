import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaFormularioComponent } from './formulario.component';

describe('JaulaFormularioComponent', () => {
  let component: JaulaFormularioComponent;
  let fixture: ComponentFixture<JaulaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
