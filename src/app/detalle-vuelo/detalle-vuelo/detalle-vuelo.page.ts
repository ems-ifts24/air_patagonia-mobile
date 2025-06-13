import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detalle-vuelo',
  standalone: true,
  templateUrl: './detalle-vuelo.page.html',
  styleUrls: ['./detalle-vuelo.page.scss'],
  imports: [IonicModule, CommonModule, RouterLink]
})
export class DetalleVueloPage implements OnInit {
  codigoVuelo: string = '';
  vuelo: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.codigoVuelo = this.route.snapshot.paramMap.get('codigo') || '';
    // Simulamos datos (más adelante podés hacer un fetch a un servicio real)
    this.vuelo = {
      pasajero: 'Francisco García',
      origen: 'Buenos Aires',
      destino: 'Córdoba',
      fecha: '24 abril',
      hora: '16:30',
      status: 'Programado',
      asiento: '12A'
    };
  }
}
