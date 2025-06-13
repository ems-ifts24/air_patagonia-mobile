import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule,CommonModule,RouterLink,NgIf,NgFor,FormsModule]
})
export class HomePage {
 vuelos = [
    { codigo:'AR1234',origen: 'Buenos Aires', destino: 'Bariloche', fecha: '2025-06-15', estado: 'Confirmado' },
    { codigo:'AR1235',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' },
    { codigo:'AR1236',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' },
    { codigo:'AR1237',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' }
  ];
  vuelosFiltrados = [...this.vuelos];
terminoBusqueda: string = '';

ngOnInit() {
  this.vuelosFiltrados = [...this.vuelos];
}

filtrarVuelos() {
  const termino = this.terminoBusqueda.toLowerCase();
  this.vuelosFiltrados = this.vuelos.filter(vuelo =>
     vuelo.codigo.toLowerCase().includes(termino) ||
    vuelo.origen.toLowerCase().includes(termino) ||
    vuelo.destino.toLowerCase().includes(termino)
  );
}

}
