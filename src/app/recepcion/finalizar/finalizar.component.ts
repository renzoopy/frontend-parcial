import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TurnoService } from '../../turno/turno.service';
import { JaulaService } from '../../jaula/jaula.service';
import { Turno } from '../../turno/turno.model';
import { Jaula } from '../../jaula/jaula.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recepcion-finalizar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.css']
})
export class RecepcionFinalizarComponent {
  @Input() turno: Turno | null = null;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  selectedJaula: Jaula | null = null;

  constructor(
    private turnoService: TurnoService,
    private jaulaService: JaulaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.turno && this.turno.idJaula) {
      this.jaulaService.getJaula(this.turno.idJaula).subscribe({
        next: (jaula) => this.selectedJaula = jaula,
        error: (error) => console.error('Error fetching jaula', error)
      });
    }
  }

  onClose() {
    this.close.emit();
    this.cdr.detectChanges()
  }

  finalizarRecepcion() {
    if (this.turno && this.selectedJaula) {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const horaFormateada = `${horas}:${minutos}`;

      const turnoActualizado: Turno = {
        ...this.turno,
        horaFinRecepcion: horaFormateada
      };

      const jaulaActualizada: Jaula = {
        ...this.selectedJaula,
        enUso: 'N'
      };

      this.turnoService.updateTurno(turnoActualizado).subscribe({
        next: () => {
          this.jaulaService.updateJaula(jaulaActualizada).subscribe({
            next: () => {
              this.save.emit();
              this.close.emit();
              this.cdr.detectChanges();
            },
            error: (error) => console.error('Error updating jaula', error)
          });
        },
        error: (error) => console.error('Error updating turno', error)
      });
    }
  }
}
