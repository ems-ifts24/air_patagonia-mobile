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
  ToastController,
  IonInput,
} from '@ionic/angular/standalone';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { NotificacionService } from 'src/app/services/notificaciones.service';
import { download, location, chevronBackOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';

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
    IonInput,
    IonSpinner,
    IonToggle,
    FormsModule
  ]
})
export class TarjetaEmbarquePage implements OnInit {
  qrDataUrl?: string;

  // información del pasajero
  nombrePasajero = 'Francisco Garcia';
  dniPasajero = '12345678';

  // información del vuelo
  numeroVuelo = 'AR1234';
  numeroAsiento = '12A';
  clase = 'Turista';
  fechaVuelo = new Date(); // solo referencia

  // info embarque
  horaEmbarque = '11:00';
  puertaEmbarque = '12';

  // info aeropuertos
  aeropuertoSalida = 'BUE';
  ciudadSalida = 'Aeroparque';
  horaSalida = '11:45';
  aeropuertoLlegada = 'MDQ';
  ciudadLlegada = 'Mar del Plata';
  horaLlegada = '17:00';

  // notificaciones
  minutosAntes = 1;
  notificacionesActivas = false;

  constructor(
    private tarjetaService: TarjetaEmbarqueService,
    private toastController: ToastController,
    private ubicacionService: UbicacionService,
    private notificacionService: NotificacionService
  ) {}

  async ngOnInit() {
    this.generarCodigoQr();
    await this.ubicacionService.obtenerUbicacion();
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
        nombrePasajero: this.nombrePasajero,
        dniPasajero: this.dniPasajero,
        numeroVuelo: this.numeroVuelo,
        numeroAsiento: this.numeroAsiento,
        clase: this.clase,
        fechaVuelo: this.fechaVuelo,
        aeropuertoSalida: this.aeropuertoSalida,
        ciudadSalida: this.ciudadSalida,
        horaSalida: this.horaSalida,
        aeropuertoLlegada: this.aeropuertoLlegada,
        ciudadLlegada: this.ciudadLlegada,
        horaLlegada: this.horaLlegada,
        horaEmbarque: this.horaEmbarque,
        puertaEmbarque: this.puertaEmbarque
      };

      const { base64, nombreArchivo } = await this.tarjetaService.generarPdfTarjetaEmbarque(datosVuelo, this.qrDataUrl);
      await this.tarjetaService.descargarTarjeta(base64, nombreArchivo);
      this.toast('Descarga exitosa');
    } catch (error: any) {
      console.error('Error al descargar tarjeta de embarque:', error);
      this.toast('Error en la descarga');
    }
  }

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

  abrirRuta() {
    const latDestino = -37.9340;
    const lngDestino = -57.5373;
    this.ubicacionService.abrirRutaHastaDestino(latDestino, lngDestino);
  }

  async onToggleNotificacion(event: any) {
    this.notificacionesActivas = event.detail.checked;

    if (this.notificacionesActivas) {
      const mensaje = `Tu vuelo ${this.numeroVuelo} embarca pronto.`;
      const fechaSimulada = this.fechaDePrueba(3); // Notifica como si el vuelo fuera dentro de 3 minutos

      const permiso = await this.notificacionService.solicitarPermisos();

      if (permiso) {
        await this.notificacionService.programarNotificacion(
          mensaje,
          fechaSimulada,
          this.minutosAntes
        );
        this.toast('Notificación activada');
      } else {
        this.toast('No otorgaste permisos para notificaciones');
        this.notificacionesActivas = false;
      }
    } else {
      await this.notificacionService.cancelarNotificaciones();
      this.toast('Notificación desactivada');
    }
  }

  //  Esta función genera una fecha de prueba "X" minutos desde ahora
  private fechaDePrueba(minutosDesdeAhora: number): Date {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() + minutosDesdeAhora);
    return ahora;
  }
 
//   async onMinutosAntesChange() {
//   if (this.notificacionesActivas) {
//     await this.notificacionService.cancelarNotificaciones();

//     const mensaje = `Tu vuelo ${this.numeroVuelo} embarca pronto.`;
//     const fechaSimulada = this.fechaDePrueba(3); // misma lógica de prueba

//     await this.notificacionService.programarNotificacion(
//       mensaje,
//       fechaSimulada,
//       this.minutosAntes
//     );

//     this.toast('Tiempo de notificación actualizado');
//   }
// }

}
