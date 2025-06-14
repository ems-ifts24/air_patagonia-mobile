import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarjetaEmbarquePageRoutingModule } from './tarjeta-embarque-routing.module';

import { TarjetaEmbarquePage } from './tarjeta-embarque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetaEmbarquePageRoutingModule
  ],
  declarations: [TarjetaEmbarquePage]
})
export class TarjetaEmbarquePageModule {}
