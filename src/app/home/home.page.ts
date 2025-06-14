import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VuelosService } from '../core/services/vuelos.service';
import { HttpClientModule } from '@angular/common/http'; 


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, NgIf, NgFor, FormsModule,HttpClientModule],
  providers: [VuelosService] 
})
export class HomePage implements OnInit {
  vuelos: any[] = [];
  vuelosFiltrados: any[] = [];
  terminoBusqueda: string = '';

  constructor(private vuelosService: VuelosService) {}

  ngOnInit() {
    this.vuelosService.obtenerVuelos().subscribe({
      next: (data) => {
        this.vuelos = data;
        this.vuelosFiltrados = [...this.vuelos];
      },
      error: (error) => {
        console.error('Error al obtener vuelos:', error);
      }
    });
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