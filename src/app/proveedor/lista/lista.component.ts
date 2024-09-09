import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from '../proveedor.service';
import { Proveedor } from '../proveedor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-proveedor-lista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ProveedorListaComponent implements OnInit {
  proveedores: Proveedor[] = [];
  searchTerm: string = '';

  constructor(private proveedorService: ProveedorService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProveedores();
  }

  loadProveedores() {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching proveedores', error);
      }
    });
  }

  agregarProveedor() {
    this.router.navigate(['/proveedores/formulario/0']);
  }

  get filteredProveedores() {
    return this.proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  verDetalles(id: number) {
    this.router.navigate(['/proveedores/formulario', id]);
  }

  eliminarProveedor(id: string) {
    this.proveedorService.deleteProveedor(id).subscribe({
      next: () => this.loadProveedores(),
      error: (error) => console.error('Error deleting proveedor', error)
    });
  }

  editarProveedor(proveedor: Proveedor): void {
    this.router.navigate([`/proveedores/formulario/${proveedor.idProveedor}`], { queryParams: { isEdit: true } });
  }
}
