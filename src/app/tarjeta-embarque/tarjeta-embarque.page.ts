import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaEmbarqueService } from '../services/tarjeta-embarque.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { Vuelo, listaVuelos, Coordenadas, datosQR, coordenadasAEP, coordenadasEZE } from '../Mocks/vuelos.mock';
import { UserApp, userFrancisco } from '../Mocks/userApp.mock';
import { addIcons } from 'ionicons';
import { IonText } from '@ionic/angular/standalone';

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
    IonText,
    FormsModule
  ]
})
export class TarjetaEmbarquePage implements OnInit {
  qrDataUrl?: string;
  userApp: UserApp | undefined;
  vuelo: Vuelo | undefined;
  coordenadas: Coordenadas | undefined;
  datosQR: datosQR | undefined;

  fechaActual = new Date(); // solo referencia

  datosVuelo: any;

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
      const mensaje = `Tu vuelo ${this.vuelo?.codigo} embarca pronto.`;
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

}
