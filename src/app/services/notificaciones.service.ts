import { Injectable } from '@angular/core';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleOptions,
} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  constructor() {}

  async solicitarPermisos(): Promise<boolean> {
    const status: PermissionStatus = await LocalNotifications.requestPermissions();
    return status.display === 'granted';
  }

  async programarNotificacion(
    mensaje: string,
    fechaVuelo: Date,
    minutosAntes: number
  ) {
    const permiso = await this.solicitarPermisos();
    if (!permiso) {
      console.warn('Permiso para notificaciones no otorgado');
      return;
    }

    const tiempoAlerta = new Date(fechaVuelo.getTime() - minutosAntes * 60000);

    const notificacion: ScheduleOptions = {
      notifications: [
        {
          id: 1,
          title: 'Air Patagonia',
          body: mensaje,
          schedule: {
            at: tiempoAlerta,
          },
        },
      ],
    };

    await LocalNotifications.schedule(notificacion);
    console.log('Notificación programada para:', tiempoAlerta);
  }

  async cancelarNotificaciones() {
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
  }
}