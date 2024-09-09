import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno, TurnoDetalle } from './turno.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:3000/turnos';
  private detallesUrl = 'http://localhost:3000/detalles';

  constructor(private http: HttpClient) {}

  getTurnos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  getTurno(id: string): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`);
  }

  addTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  updateTurno(turno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${turno.id}`, turno);
  }

  deleteTurno(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTurnosPorFecha(fecha: string): Observable<Turno[]> {
    const url = fecha ? `${this.apiUrl}?fecha=${fecha}` : this.apiUrl;
    return this.http.get<Turno[]>(url);
  }
  
  // Métodos adicionales para manejar detalles de los turnos
  getDetalles(idTurno: number): Observable<TurnoDetalle[]> {
    return this.http.get<TurnoDetalle[]>(`${this.detallesUrl}?idTurno=${idTurno}`);
  }

  addDetalle(detalle: TurnoDetalle): Observable<TurnoDetalle> {
    return this.http.post<TurnoDetalle>(this.detallesUrl, detalle);
  }

  deleteDetalle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.detallesUrl}/${id}`);
  }
}
