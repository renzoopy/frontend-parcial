import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TurnoService } from '../../turno/turno.service';
import { JaulaService } from '../../jaula/jaula.service';
import { Turno } from '../../turno/turno.model';
import { Jaula } from '../../jaula/jaula.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recepcion-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class RecepcionFormularioComponent {
  @Input() turno: Turno | null = null;
  @Output() save = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  jaulasDisponibles: Jaula[] = [];
  selectedJaula: Jaula | null = null;

  constructor(
    private turnoService: TurnoService,
    private jaulaService: JaulaService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadJaulasDisponibles();
  }

  onClose() {
    this.close.emit();
    this.cdr.detectChanges()
  }

  loadJaulasDisponibles() {
    this.jaulaService.getJaulas().subscribe({
      next: (jaulas) => {
        this.jaulasDisponibles = jaulas.filter(j => j.enUso === 'N');
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error fetching jaulas', error)
    });
  }

  iniciarRecepcion() {
    if (this.turno && this.selectedJaula) {
      const ahora = new Date();
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const horaFormateada = `${horas}:${minutos}`;
  
      const turnoActualizado: Turno = {
        ...this.turno,
        horaInicioRecepcion: horaFormateada,
        idJaula: this.selectedJaula.id
      };
  
      const jaulaActualizada: Jaula = {
        ...this.selectedJaula,
        enUso: 'S'
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
