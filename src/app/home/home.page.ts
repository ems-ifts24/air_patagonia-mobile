import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TarjetaEmbarqueService } from '../services/tarjeta-embarque.service';
import { listaVuelos } from '../Mocks/vuelos.mock';
import { Vuelo } from '../models/vuelos.model';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SharedModule
  ]
})
export class HomePage {
  
  vuelosFiltrados: Vuelo[] = [];
  terminoBusqueda: string = '';

  private intervalo: any;

  constructor(private _tarjetaService: TarjetaEmbarqueService) {}

  ngOnInit() {
    this.vuelosFiltrados = listaVuelos.sort((a, b) => a.fechaVuelo.getTime() - b.fechaVuelo.getTime());
    this.iniciarActualizacionTiempo();
  }

  ngOnDestroy() {
    // Al destruir el componente, detiene la actualización del tiempo
    this.detenerActualizacionTiempo();
  }

  filtrarVuelos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.vuelosFiltrados = listaVuelos.filter(vuelo =>
      vuelo.codigo.toLowerCase().includes(termino) ||
      vuelo.origen.toLowerCase().includes(termino) ||
      vuelo.destino.toLowerCase().includes(termino)
    );
  }


  // ---------------------------------------
  // Actualización del tiempo
  // ---------------------------------------
  private iniciarActualizacionTiempo() {
    // Sigue actualizando cada 1 segundo
    this.intervalo = setInterval(() => {
      this.actualizarTiempo();
    }, 1000);
  }

  private actualizarTiempo() {
    const ahora = new Date();
    const vuelo = this.vuelosFiltrados[0];
    
    if (!vuelo) return;
    
    // Forzar la detección de cambios
    setTimeout(() => {
      // Esto forzará a Angular a detectar cambios
      this.cuentaRegresiva(vuelo);
    }, 0);
  }

  // ---------------------------------------
  // Detener actualización del tiempo
  // ---------------------------------------
  private detenerActualizacionTiempo() {
    // Si el intervalo existe, lo detiene
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  // ---------------------------------------
  // Validaciones si aún falta para embarcar
  // ---------------------------------------
  esEmbarcado(vuelo: Vuelo): boolean {
    const ahora = new Date();
    // Obtiene la hora de embarque del vuelo para asegurarse que el pasajero llegue al aeropuerto con tiempo
    const horaEmbarque = this._tarjetaService.horaDeEmbarque(vuelo.fechaVuelo, vuelo.esInternacional);
    return horaEmbarque.getTime() <= ahora.getTime();
  }

  // ---------------------------------------
  // Cuenta regresiva
  // ---------------------------------------
  cuentaRegresiva(vuelo: Vuelo): string {
    const ahora = new Date();
    // Obtiene la hora de embarque del vuelo para asegurarse que el pasajero llegue al aeropuerto con tiempo
    const horaEmbarque = this._tarjetaService.horaDeEmbarque(vuelo.fechaVuelo, vuelo.esInternacional);
    const diferencia = horaEmbarque.getTime() - ahora.getTime();
    if (diferencia <= 0) return '0d 0h 0m';

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return `${dias}d ${horas}h ${minutos}m ${segundos}s`;
  }

}
