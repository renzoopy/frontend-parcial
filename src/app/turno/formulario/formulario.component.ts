import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from '../turno.service';
import { JaulaService } from '../../jaula/jaula.service';
import { ProductoService } from '../../producto/producto.service';
import { ProveedorService } from '../../proveedor/proveedor.service';
import { Turno, TurnoDetalle } from '../turno.model';
import { Producto } from '../../producto/producto.model';
import { Proveedor } from '../../proveedor/proveedor.model';
import { Jaula } from '../../jaula/jaula.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-turno-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class TurnoFormularioComponent implements OnInit {
  turno: Turno = {
    id: "",
    idTurno: 0,
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: '',
    idJaula: '',
    horaInicioRecepcion: '',
    horaFinRecepcion: ''
  };
  isEdit: boolean = false;
  detalles: TurnoDetalle[] = [];
  allProductos: Producto[] = [];
  allProveedores: Proveedor[] = [];
  allJaulas: Jaula[] = [];
  
  // Valores predefinidos para las horas
  horasDisponibles: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];

  selectedProducto: Producto | null = null;
  cantidad: number = 1;
  private nextDetalleId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService,
    private jaulaService: JaulaService,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProductos();
    this.loadProveedores();
    this.loadJaulas();
  
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.isEdit = id !== '0';
      if (this.isEdit) {
        this.turnoService.getTurno(id).subscribe({
          next: (data) => {
            this.turno = data;
            // Cargar detalles del turno
            this.turnoService.getDetalles(this.turno.idTurno).subscribe(detalles => {
              this.detalles = detalles;
              // Establecer el próximo ID disponible
              this.nextDetalleId = detalles.length > 0 ? Math.max(...detalles.map(d => +d.id)) + 1 : 1;
              this.cdr.detectChanges(); // Forzar detección de cambios después de cargar detalles
            });
          },
          error: (error) => console.error('Error fetching turno', error)
        });
      }
    });
  }

  onSubmit() {
    const turnoToSave: Turno = {
      ...this.turno,
      id: this.turno.idTurno.toString()
    };

    if (this.isEdit) {
      this.turnoService.updateTurno(turnoToSave).subscribe({
        next: () => this.router.navigate(['/turnos/lista']),
        error: (error) => console.error('Error updating turno', error)
      });
    } else {
      this.turnoService.getTurnos().subscribe({
        next: (turnos) => {
          const nextIdTurno = turnos.length > 0 ? Math.max(...turnos.map(t => t.idTurno)) + 1 : 1;
          turnoToSave.idTurno = nextIdTurno;
          turnoToSave.id = nextIdTurno.toString();
          this.turnoService.addTurno(turnoToSave).subscribe({
            next: () => {
              // Guardar los detalles del turno
              this.detalles.forEach(detalle => {
                let num = this.nextDetalleId++
                detalle.id = num.toString(); // Asignar un ID único
                this.turnoService.addDetalle(detalle).subscribe();
              });
              this.router.navigate(['/turnos/lista']);
            },
            error: (error) => console.error('Error adding turno', error)
          });
        },
        error: (error) => console.error('Error fetching turnos for new id', error)
      });
    }
  }

  loadProductos() {
    this.productoService.getProductos().subscribe({
      next: (productos) => this.allProductos = productos,
      error: (error) => console.error('Error fetching productos', error)
    });
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

  cancelar() {
    this.router.navigate(['/turnos/lista']);
  }

  agregarDetalle(producto: Producto | null, cantidad: number) {
    if (producto && cantidad) {
      let num = this.nextDetalleId++
      const nuevoDetalle: TurnoDetalle = {
        id: num.toString(),
        idTurno: this.turno.idTurno,
        idProducto: producto.idProducto,
        cantidad: cantidad
      };
      this.turnoService.addDetalle(nuevoDetalle).subscribe({
        next: () => {
          this.detalles.push(nuevoDetalle);
          this.cdr.detectChanges(); // Forzar detección de cambios después de agregar detalle
          this.selectedProducto = null;
          this.cantidad = 1;
        },
        error: (error) => console.error('Error adding detalle', error)
      });
    }
  }

  eliminarDetalle(id: string) {
    this.turnoService.deleteDetalle(id).subscribe({
      next: () => {
        this.detalles = this.detalles.filter(detalle => detalle.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error deleting detalle', error)
    });
  }

  getProductoNombre(idProducto: number): string {
    const producto = this.allProductos.find(p => p.idProducto === idProducto);
    return producto ? producto.nombre : 'Desconocido';
  }
}
