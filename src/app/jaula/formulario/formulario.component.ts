import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JaulaService } from '../jaula.service';
import { Jaula } from '../jaula.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-jaula-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class JaulaFormularioComponent implements OnInit {
  jaula: Jaula = { id: "", idJaula: 0, nombre: '', enUso: 'N' };
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jaulaService: JaulaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.isEdit = id !== 0;
      if (this.isEdit) {
        this.jaulaService.getJaula(id.toString()).subscribe({
          next: (data) => {
            this.jaula = data;
            this.cdr.detectChanges();
          },
          error: (error) => console.error('Error fetching jaula', error)
        });
      }
    });
  }

  onSubmit() {
    const jaulaToSave: Jaula = {
      ...this.jaula,
      id: this.jaula.idJaula.toString()
    };

    if (this.isEdit) {
      this.jaulaService.updateJaula(jaulaToSave).subscribe({
        next: () => this.router.navigate(['/jaulas/lista']),
        error: (error) => console.error('Error updating jaula', error)
      });
    } else {
      this.jaulaService.getJaulas().subscribe({
        next: (jaulas) => {
          const nextIdJaula = jaulas.length > 0 ? Math.max(...jaulas.map(j => j.idJaula)) + 1 : 1;
          jaulaToSave.idJaula = nextIdJaula;
          jaulaToSave.id = nextIdJaula.toString();
          this.jaulaService.addJaula(jaulaToSave).subscribe({
            next: () => this.router.navigate(['/jaulas/lista']),
            error: (error) => console.error('Error adding jaula', error)
          });
        },
        error: (error) => console.error('Error fetching jaulas for new id', error)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/jaulas/lista']);
  }
}
