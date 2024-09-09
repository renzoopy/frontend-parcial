import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TurnoService } from '../../turno/turno.service';
import { Turno } from '../../turno/turno.model';
import { ProductoService } from '../../producto/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turno-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class TurnoDetallesComponent {
  @Input() turno: Turno | null = null;
  @Output() close = new EventEmitter<void>();
  productosDetalles: { nombre: string; cantidad: number }[] = [];

  constructor(
    private turnoService: TurnoService, 
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadDetalles();
  }

  ngOnInit() {
    if (this.turno) {
      this.loadDetalles();
    }
  }

  onClose() {
    this.close.emit();
    this.cdr.detectChanges()
  }

  loadDetalles() {
    if (this.turno) {
      this.turnoService.getDetalles(this.turno.idTurno).subscribe({
        next: (detalles) => {
          // Suponiendo que detalles contiene { idProducto: number; cantidad: number }
          this.productoService.getProductos().subscribe({
            next: (productos) => {
              this.productosDetalles = detalles.map(detalle => ({
                nombre: productos.find(p => p.idProducto === detalle.idProducto)?.nombre || 'Desconocido',
                cantidad: detalle.cantidad
              }));
              this.cdr.detectChanges();
            },
            error: (error) => console.error('Error fetching productos', error)
          });
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Error fetching detalles', error)
      });
    }
  }
}
