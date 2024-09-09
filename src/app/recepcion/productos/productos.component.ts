import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TurnoService } from '../../turno/turno.service';
import { ProveedorService } from '../../proveedor/proveedor.service';
import { JaulaService } from '../../jaula/jaula.service';
import { Turno } from '../../turno/turno.model';
import { Proveedor } from '../../proveedor/proveedor.model';
import { Jaula } from '../../jaula/jaula.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupComponent } from '../../popup/popup.component';
import { RecepcionFormularioComponent } from '../formulario/formulario.component';
import { RecepcionFinalizarComponent } from '../finalizar/finalizar.component';
import { TurnoDetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-recepcion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, PopupComponent, RecepcionFormularioComponent, RecepcionFinalizarComponent, TurnoDetallesComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class RecepcionProductosComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  selectedDate: string = '';
  turnos: Turno[] = [];
  filteredTurnos: Turno[] = [];
  allProveedores: Proveedor[] = [];
  allJaulas: Jaula[] = [];
  selectedTurno: Turno | null = null;
  popupIniciarRecepcion: boolean = false;
  popupFinalizarRecepcion: boolean = false;
  popupDetalles: boolean = false;

  constructor(
    private turnoService: TurnoService,
    private proveedorService: ProveedorService,
    private jaulaService: JaulaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProveedores();
    this.loadJaulas();
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

  filtrarTurnos() {
    if (this.selectedDate) {
      this.turnoService.getTurnosPorFecha(this.selectedDate).subscribe({
        next: (data) => {
          this.turnos = data;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error fetching turnos', error)
      });
    } else {
      this.loadTurnos();
      this.cdr.detectChanges();
    }
  }

  abrirPopupIniciarRecepcion(turno: Turno) {
    this.selectedTurno = turno;
    this.popupIniciarRecepcion = true;
    this.cdr.detectChanges();
  }

  onCloseIniciarRecepcion() {
    this.popupIniciarRecepcion = false;
    this.cdr.detectChanges();
  }

  abrirPopupFinalizarRecepcion(turno: Turno) {
    this.selectedTurno = turno;
    this.popupFinalizarRecepcion = true;
    this.cdr.detectChanges();
  }

  onCloseFinalizarRecepcion() {
    this.popupFinalizarRecepcion = false;
    this.cdr.detectChanges();
  }

  abrirPopupDetalles(turno: Turno) {
    this.selectedTurno = turno;
    this.popupDetalles = true;
    this.cdr.detectChanges();
  }

  onCloseDetalles() {
    this.popupDetalles = false;
    this.cdr.detectChanges();
  }

  getEstado(turno: Turno): string {
    if (turno.horaFinRecepcion) {
      return 'Completado';
    } else if (turno.horaInicioRecepcion) {
      return 'En Recepción';
    } else {
      return 'Pendiente';
    }
  }

  getProveedorNombre(idProveedor: string): string {
    const proveedor = this.allProveedores.find(p => p.id === idProveedor);
    return proveedor ? proveedor.nombre : '';
  }

  getJaulaNombre(idJaula: string): string {
    const jaula = this.allJaulas.find(j => j.id === idJaula);
    return jaula ? jaula.nombre : '';
  }

  loadProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (proveedores) => this.allProveedores = proveedores,
      error: (error) => console.error('Error fetching proveedores', error)
    });
  }

  loadJaulas() {
    this.jaulaService.getJaulas().subscribe({
      next: (jaulas) => this.allJaulas = jaulas,
      error: (error) => console.error('Error fetching jaulas', error)
    });
  }
}
