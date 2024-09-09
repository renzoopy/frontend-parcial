import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class ProductoFormularioComponent implements OnInit {
  producto: Producto = { id:"", idProducto: 0, nombre: '' };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.isEdit = id !== 0;
      if (this.isEdit) {
        this.productoService.getProducto(id.toString()).subscribe({
          next: (data) => {
            this.producto = data;
            this.cdr.detectChanges();
          },
          error: (error) => console.error('Error fetching producto', error)
        });
      }
    });
  }

  onSubmit() {
    const productoToSave: Producto = {
      ...this.producto,
      id: this.producto.idProducto.toString()
    };

    if (this.isEdit) {
      this.productoService.updateProducto(productoToSave).subscribe({
        next: () => this.router.navigate(['/productos/lista']),
        error: (error) => console.error('Error updating producto', error)
      });
    } else {
      this.productoService.getProductos().subscribe({
        next: (productos) => {
          const nextIdProducto = productos.length > 0 ? Math.max(...productos.map(p => p.idProducto)) + 1 : 1;
          productoToSave.idProducto = nextIdProducto;
          productoToSave.id = nextIdProducto.toString();
          this.productoService.addProducto(productoToSave).subscribe({
            next: () => this.router.navigate(['/productos/lista']),
            error: (error) => console.error('Error adding producto', error)
          });
        },
        error: (error) => console.error('Error fetching productos for new id', error)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/productos/lista']);
  }
}
