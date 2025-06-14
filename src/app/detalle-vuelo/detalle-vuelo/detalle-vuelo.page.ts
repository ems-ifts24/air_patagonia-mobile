import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VuelosService } from 'src/app/core/services/vuelos.service';
import { HttpClientModule } from '@angular/common/http'; 
import { Vuelo } from 'src/app/core/services/vuelos.service';

@Component({
  selector: 'app-detalle-vuelo',
  standalone: true,
  templateUrl: './detalle-vuelo.page.html',
  styleUrls: ['./detalle-vuelo.page.scss'],
  imports: [IonicModule, CommonModule, RouterLink,HttpClientModule],
  providers: [VuelosService]
})
export class DetalleVueloPage implements OnInit {
  codigoVuelo: string = '';
  vuelo: Vuelo | undefined;

  constructor(private route: ActivatedRoute,private vuelosService: VuelosService) {}

   ngOnInit() {
    this.codigoVuelo = (this.route.snapshot.paramMap.get('codigo') || '').trim().toUpperCase();
    console.log('Código recibido:', this.codigoVuelo);

    this.vuelosService.obtenerVueloPorCodigo(this.codigoVuelo).subscribe((vueloEncontrado) => {
      console.log('Respuesta del backend (vuelo encontrado):', vueloEncontrado);
      this.vuelo = vueloEncontrado; // Asigna directamente el vuelo o undefined
      if (this.vuelo) {
        console.log('Vuelo encontrado:', this.vuelo.codigo);
      } else {
        console.log('Vuelo no encontrado para el código:', this.codigoVuelo);
      }
    });
  }
  }

