import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoDetallesComponent } from './detalles.component';

describe('TurnoDetallesComponent', () => {
  let component: TurnoDetallesComponent;
  let fixture: ComponentFixture<TurnoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoDetallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
