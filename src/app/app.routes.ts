import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalle-vuelo/:codigo',
    loadComponent: () => import('./detalle-vuelo/detalle-vuelo/detalle-vuelo.page').then( m => m.DetalleVueloPage)
  },  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto/contacto.page').then( m => m.ContactoPage)
  },


];
