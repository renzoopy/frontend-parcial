import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';

import { ProveedorListaComponent } from './proveedor/lista/lista.component';
import { ProveedorFormularioComponent } from './proveedor/formulario/formulario.component';

import { ProductoListaComponent } from './producto/lista/lista.component';
import { ProductoFormularioComponent } from './producto/formulario/formulario.component';

import { JaulaListaComponent } from './jaula/lista/lista.component';
import { JaulaFormularioComponent } from './jaula/formulario/formulario.component';

import { TurnoListaComponent } from './turno/lista/lista.component';
import { TurnoFormularioComponent } from './turno/formulario/formulario.component';

import { TurnoDetallesComponent } from './recepcion/detalles/detalles.component';
import { RecepcionFinalizarComponent } from './recepcion/finalizar/finalizar.component';
import { RecepcionFormularioComponent } from './recepcion/formulario/formulario.component';
import { RecepcionProductosComponent } from './recepcion/productos/productos.component';

const routes: Routes = [
  { path: 'proveedores/lista', component: ProveedorListaComponent },
  { path: 'proveedores/formulario/:id', component: ProveedorFormularioComponent },
  { path: 'productos/lista', component: ProductoListaComponent },
  { path: 'productos/formulario/:id', component: ProductoFormularioComponent },
  { path: 'jaulas/lista', component: JaulaListaComponent },
  { path: 'jaulas/formulario/:id', component: JaulaFormularioComponent },
  { path: 'turnos/lista', component: TurnoListaComponent },
  { path: 'turnos/formulario/:id', component: TurnoFormularioComponent },
  { path: 'recepcion/productos', component: RecepcionProductosComponent },
  { path: 'recepcion/detalles/:id', component: TurnoDetallesComponent },
  { path: 'recepcion/finalizar/:id', component: RecepcionFinalizarComponent },
  { path: 'recepcion/formulario/:id', component: RecepcionFormularioComponent },
  { path: '**', redirectTo: 'recepcion/productos' }
];

export const appRoutes = [
  provideRouter(routes)
];
