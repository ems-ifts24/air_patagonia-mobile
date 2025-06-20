import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private latitud: number | null = null;
  private longitud: number | null = null;

  async obtenerUbicacion(): Promise<Position | null> {
    try {
      const perm = await Geolocation.requestPermissions();
      if (perm.location === 'granted') {
        const coords = await Geolocation.getCurrentPosition();
        this.latitud = coords.coords.latitude;
        this.longitud = coords.coords.longitude;
        return coords;
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      return null;
    }
  }

  getLatitud(): number | null {
    return this.latitud;
  }

  getLongitud(): number | null {
    return this.longitud;
  }

  getUrlGoogleMapsIframe(): string {
    if (this.latitud && this.longitud) {
      return `https://maps.google.com/maps?q=${this.latitud},${this.longitud}&z=15&output=embed`;
    }
    return '';
  }

  abrirEnGoogleMaps() {
    if (this.latitud && this.longitud) {
      const url = `https://www.google.com/maps/search/?api=1&query=${this.latitud},${this.longitud}`;
      window.open(url, '_blank');
    }
  }
}