import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaEmbarqueService } from '../services/tarjeta-embarque.service';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonSpinner,
  IonToggle,
  ToastController
} from '@ionic/angular/standalone';
import { UbicacionService } from 'src/app/services/ubicacion.service';
// Importar iconos de Ionic directamente
const addIcons = (icons: { [key: string]: any }) => {
};
// Importar iconos individuales
import { download, location, chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tarjeta-embarque',
  standalone: true,
  templateUrl: 'tarjeta-embarque.page.html',
  styleUrls: ['./tarjeta-embarque.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonSpinner,
    IonToggle
  ]
})

export class TarjetaEmbarquePage implements OnInit {

  qrDataUrl?: string;

  // informacion del pasajero
  nombrePasajero = 'Francisco Garcia';
  dniPasajero = '12345678';

  // informacion del vuelo
  numeroVuelo = 'AR1234';
  numeroAsiento = '12A';
  clase = 'Turista';
  fechaVuelo = new Date();

  // informacion de aeropuertos
  aeropuertoSalida = 'BUE';
  ciudadSalida = 'Aeroparque';
  horaSalida = '14:30';

  aeropuertoLlegada = 'MDQ';
  ciudadLlegada = 'Mar del Plata';
  horaLlegada = '17:00';

  // informacion de embarque
  horaEmbarque = '13:45';
  puertaEmbarque = '12';

  constructor(
    private tarjetaService: TarjetaEmbarqueService,
    private toastController: ToastController,
    private ubicacionService: UbicacionService
  ) {
    addIcons({ download, location, chevronBackOutline });
  }

  async ngOnInit() {
    this.generarCodigoQr(); //invoco a metodo para generar qr al cargar la pagina
    const resultado = await this.ubicacionService.obtenerUbicacion();
  }

  async generarCodigoQr() {

    try {

      const datos = {
        nombrePasajero: this.nombrePasajero,
        dniPasajero: this.dniPasajero,
        numeroVuelo: this.numeroVuelo,
        numeroAsiento: this.numeroAsiento,
        clase: this.clase,
        fechaVuelo: this.fechaVuelo
      };

      this.qrDataUrl = await this.tarjetaService.generarCodigoQr(datos);

    } catch (error) {
      this.toast('Error al generar el código QR');
    }

  }

  async descargarTarjetaEmbarque() {

    try {

      if (!this.qrDataUrl) {
        this.toast('QR no generado');
        return;
      }

      const datosVuelo = {
        // informacion del pasajero
        nombrePasajero: this.nombrePasajero,
        dniPasajero: this.dniPasajero,
        numeroVuelo: this.numeroVuelo,
        numeroAsiento: this.numeroAsiento,
        clase: this.clase,
        fechaVuelo: this.fechaVuelo,

        // informacion de aeropuertos
        aeropuertoSalida: this.aeropuertoSalida,
        ciudadSalida: this.ciudadSalida,
        horaSalida: this.horaSalida,
        aeropuertoLlegada: this.aeropuertoLlegada,
        ciudadLlegada: this.ciudadLlegada,
        horaLlegada: this.horaLlegada,

        // informacion de embarque
        horaEmbarque: this.horaEmbarque,
        puertaEmbarque: this.puertaEmbarque
      };

      const { base64, nombreArchivo } = await this.tarjetaService.generarPdfTarjetaEmbarque(datosVuelo, this.qrDataUrl);

      await this.tarjetaService.descargarTarjeta(base64, nombreArchivo);

      this.toast('Descarga exitosa');

    }
    catch (error: any) {
      console.error('Error al descargar tarjeta de embarque:', error);
      this.toast('Error en la descarga');
    }

  }

  // metodo para mostrar msj emergente temporal
  async toast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    toast.present();
  }
  abrirMaps() {
    this.ubicacionService.abrirEnGoogleMaps();
  }
}
