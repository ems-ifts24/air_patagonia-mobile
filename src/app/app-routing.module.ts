import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tarjeta-embarque',
    loadChildren: () => import('./tarjeta-embarque/tarjeta-embarque.module').then( m => m.TarjetaEmbarquePageModule)
  },
  {
    path: '',
    redirectTo: 'home',  // ruta por defecto
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
