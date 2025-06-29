import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  IonItemGroup,
  IonLabel,
  IonSpinner,
  IonToggle,
  ToastController,
} from '@ionic/angular/standalone';
import { download, location, chevronBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonText, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';

import { TarjetaEmbarqueService } from '../services/tarjeta-embarque.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { NotificacionService } from 'src/app/services/notificaciones.service';
import { Vuelo, listaVuelos, Coordenadas, datosQR, coordenadasAEP, coordenadasEZE, NotificacionVuelo, listaNotificaciones } from '../Mocks/vuelos.mock';
import { UserApp, userFrancisco } from '../Mocks/userApp.mock';

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
    IonItemGroup,
    IonLabel,
    IonSpinner,
    IonToggle,
    IonText,
    FormsModule,
    IonDatetime,
    IonDatetimeButton,
    IonModal
  ]
})
export class TarjetaEmbarquePage implements OnInit {
  qrDataUrl?: string;
  userApp: UserApp | undefined;
  vuelo: Vuelo | undefined;
  coordenadas: Coordenadas | undefined;
  datosQR: datosQR | undefined;
  notificacion: NotificacionVuelo | undefined;

  fechaActual = new Date(); // solo referencia

  // notificaciones
  minutosAntes = 1;
  notificacionesActivas = false;

  constructor(
    private tarjetaService: TarjetaEmbarqueService,
    private toastController: ToastController,
    private ubicacionService: UbicacionService,
    private notificacionService: NotificacionService,
    private route: ActivatedRoute
  ) {
    addIcons({
      'download': download,
      'location': location,
      'chevronBackOutline': chevronBackOutline,
    });
  }

  async ngOnInit() {
    this.userApp = userFrancisco;
    await this.ubicacionService.obtenerUbicacion();
    
    const codigoVuelo = this.route.snapshot.paramMap.get('codigo');
    if (codigoVuelo)
      this.vuelo = listaVuelos.find(vuelo => vuelo.codigo === codigoVuelo);
    else
      console.error('Vuelo no encontrado');

    this.generarCodigoQr();
    this.notificacion = listaNotificaciones.find(notificacion => notificacion.codigoVuelo === this.vuelo?.codigo);
  }


  async generarCodigoQr() {
    try {
      this.datosQR = {
        nombrePasajero: this.userApp!.nombre + ' ' + this.userApp!.apellido,
        dniPasajero: this.userApp!.dni,
        numeroVuelo: this.vuelo!.codigo,
        numeroAsiento: this.vuelo!.asiento,
        clase: this.vuelo!.clase,
        fechaVuelo: this.vuelo!.fechaVuelo,
        aeropuertoSalida: this.vuelo!.aeropuertoSalida,
        ciudadSalida: this.vuelo!.origen,
        horaSalida: this.vuelo!.horaSalida,
        aeropuertoLlegada: this.vuelo!.aeropuertoLlegada,
        ciudadLlegada: this.vuelo!.destino,
        horaLlegada: this.vuelo!.horaLlegada,
        horaEmbarque: this.tarjetaService.horaDeEmbarque(this.vuelo!.horaSalida, this.vuelo!.esInternacional),
        puertaEmbarque: this.vuelo!.puertaEmbarque
      };

      this.qrDataUrl = await this.tarjetaService.generarCodigoQr(this.datosQR);
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

      const { base64, nombreArchivo } = await this.tarjetaService.generarPdfTarjetaEmbarque(this.datosQR, this.qrDataUrl);
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

  abrirRuta(aeropuerto: string) {
    // Según el parametro aeropuerto (por ahora solo 'AEP' o 'EZE'), se cargan sus coordenadas y se abre la ruta para llegar al mismo.
    const aeropuertoPartida = aeropuerto == 'AEP' ? coordenadasAEP : coordenadasEZE;
    this.ubicacionService.abrirRutaHastaDestino(aeropuertoPartida);
  }

  async onToggleNotificacion(event: any) {
    this.notificacionesActivas = event.detail.checked;

    if (this.notificacionesActivas) {
      const mensaje = `Recordatorio: Tu vuelo ${this.vuelo?.codigo} embarca pronto.`;
      
      const permiso = await this.notificacionService.solicitarPermisos();

      if (permiso) {
        await this.notificacionService.programarNotificacion(mensaje, this.fechaActual);
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

}
