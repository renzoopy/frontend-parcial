import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JaulaService } from '../jaula.service';
import { Jaula } from '../jaula.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-jaula-lista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class JaulaListaComponent implements OnInit {
  jaulas: Jaula[] = [];
  searchTerm: string = '';

  constructor(private jaulaService: JaulaService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadJaulas();
  }

  loadJaulas() {
    this.jaulaService.getJaulas().subscribe({
      next: (data) => {
        this.jaulas = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error fetching jaulas', error)
    });
  }

  agregarJaula() {
    this.router.navigate(['/jaulas/formulario/0']);
  }

  get filteredJaulas() {
    return this.jaulas.filter(jaula =>
      jaula.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  verDetalles(jaula: Jaula): void {
    this.router.navigate([`/jaulas/detalle/${jaula.idJaula}`]);
  }

  eliminarJaula(id: string): void {
    this.jaulaService.deleteJaula(id).subscribe({
      next: () => this.loadJaulas(),
      error: (error) => console.error('Error deleting jaula', error)
    });
  }

  editarJaula(jaula: Jaula): void {
    this.router.navigate([`/jaulas/formulario/${jaula.idJaula}`]);
  }
}
