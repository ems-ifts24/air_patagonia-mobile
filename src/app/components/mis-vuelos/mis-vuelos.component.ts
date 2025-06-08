import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonButton }  from '@ionic/angular/standalone';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-vuelos',
  standalone: true,
  imports: [CommonModule, IonicModule,NgIf,NgFor,IonButton,FormsModule],
  templateUrl: './mis-vuelos.component.html',
  styleUrls: ['./mis-vuelos.component.scss'],
})
export class MisVuelosComponent {
  vuelos = [
    { codigo:'AR1234',origen: 'Buenos Aires', destino: 'Bariloche', fecha: '2025-06-15', estado: 'Confirmado' },
    { codigo:'AR1235',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' },
    { codigo:'AR1235',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' },
    { codigo:'AR1235',origen: 'Bariloche', destino: 'Mendoza', fecha: '2025-06-20', estado: 'Pendiente' }
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