import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarjetaEmbarquePage } from './tarjeta-embarque.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetaEmbarquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetaEmbarquePageRoutingModule {}
