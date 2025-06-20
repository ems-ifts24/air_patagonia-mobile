import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  
  {
    path: 'contacto',
    loadComponent: () => import('./contacto/contacto.page').then( m => m.ContactoPage)
  },
 
   {
    path: 'tarjetaEmbarque',
    loadComponent: () => import('./tarjeta-embarque/tarjeta-embarque.page').then( m => m.TarjetaEmbarquePage)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**', // Cualquier otra ruta que no coincida con las anteriores
    redirectTo: 'login' // Redirige también al login o a una página 404 si la tienes
  }
 

];
