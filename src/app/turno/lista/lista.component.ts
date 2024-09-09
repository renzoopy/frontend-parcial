import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnoService } from '../turno.service';
import { Turno } from '../turno.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-turno-lista',
  standalone: true,
  imports: [FormsModule, CommonModule, PopupComponent],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class TurnoListaComponent implements OnInit {
  turnos: Turno[] = [];
  filteredTurnos: Turno[] = [];
  selectedDate: string = '';

  constructor(private turnoService: TurnoService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTurnos();
  }

  loadTurnos() {
    this.turnoService.getTurnos().subscribe({
      next: (data) => {
        this.turnos = data;
        this.filteredTurnos = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error fetching turnos', error)
    });
  }

  agregarTurno() {
    this.router.navigate(['/turnos/formulario/0']);
  }

  filtrarTurnos(): void {
    if (this.selectedDate) {
      this.turnoService.getTurnosPorFecha(this.selectedDate).subscribe({
        next: (data) => {
          this.filteredTurnos = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error fetching turnos', error)
      });
    } else {
      this.loadTurnos(); // Carga todos los turnos si no hay fecha seleccionada
    }
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
    this.filtrarTurnos();
  }

  verDetalles(turno: Turno): void {
    this.router.navigate([`/turnos/detalle/${turno.idTurno}`]);
  }

  eliminarTurno(id: string): void {
    this.turnoService.deleteTurno(id).subscribe({
      next: () => this.loadTurnos(),
      error: (error) => console.error('Error deleting turno', error)
    });
  }

  editarTurno(turno: Turno): void {
    this.router.navigate([`/turnos/formulario/${turno.idTurno}`]);
  }
}
