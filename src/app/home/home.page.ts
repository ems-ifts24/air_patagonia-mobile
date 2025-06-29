import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { listaVuelos } from '../Mocks/vuelos.mock';
import { Vuelo } from '../models/vuelos.model';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent, 
  IonSearchbar,
  IonButton,
  IonText
} from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSearchbar,
    IonButton,
    IonText
  ]
})
export class HomePage {
  
  vuelosFiltrados: Vuelo[] = [];
  terminoBusqueda: string = '';

  ngOnInit() {
    this.vuelosFiltrados = [...listaVuelos];
  }

  filtrarVuelos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.vuelosFiltrados = listaVuelos.filter(vuelo =>
      vuelo.codigo.toLowerCase().includes(termino) ||
      vuelo.origen.toLowerCase().includes(termino) ||
      vuelo.destino.toLowerCase().includes(termino)
    );
  }

}
