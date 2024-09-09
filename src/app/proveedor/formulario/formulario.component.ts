import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../proveedor.service';
import { Proveedor } from '../proveedor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-proveedor-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class ProveedorFormularioComponent implements OnInit {
  proveedor: Proveedor = { id: '', idProveedor: 0, nombre: '' };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proveedorService: ProveedorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.isEdit = id !== 0;
      if (this.isEdit) {
        this.proveedorService.getProveedor(id.toString()).subscribe({
          next: (data) => {
            this.proveedor = data;
            this.cdr.detectChanges();
          },
          error: (error) => console.error('Error fetching proveedor', error)
        });
      }
    });
  }

  onSubmit() {
    const proveedorToSave: Proveedor = {
      ...this.proveedor,
      id: this.proveedor.idProveedor.toString()
    };

    if (this.isEdit) {
      this.proveedorService.updateProveedor(proveedorToSave).subscribe({
        next: () => this.router.navigate(['/proveedores/lista']),
        error: (error) => console.error('Error updating proveedor', error)
      });
    } else {
      this.proveedorService.getProveedores().subscribe({
        next: (proveedores) => {
          const nextIdProducto = proveedores.length > 0 ? Math.max(...proveedores.map(p => p.idProveedor)) + 1 : 1;
          proveedorToSave.idProveedor = nextIdProducto;
          proveedorToSave.id = nextIdProducto.toString();
          this.proveedorService.addProveedor(proveedorToSave).subscribe({
            next: () => this.router.navigate(['/proveedores/lista']),
            error: (error) => console.error('Error adding producto', error)
          });
        },
        error: (error) => console.error('Error fetching productos for new id', error)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/proveedores/lista']);
  }
}
