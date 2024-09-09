import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[] = [];
  searchTerm: string = '';

  constructor(private productoService: ProductoService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching productos', error);
      }
    });
  }

  agregarProducto() {
    this.router.navigate(['/productos/formulario/0']);
  }

  get filteredProductos() {
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  verDetalles(producto: Producto): void {
    this.router.navigate([`/productos/detalle/${producto.idProducto}`]);
  }

  eliminarProducto(id: string): void {
    this.productoService.deleteProducto(id).subscribe({
      next: () => this.loadProductos(),
      error: (error) => console.error('Error deleting producto', error)
    });
  }

  editarProducto(producto: Producto): void {
    this.router.navigate([`/productos/formulario/${producto.idProducto}`], { queryParams: { isEdit: true } });
  }
}
