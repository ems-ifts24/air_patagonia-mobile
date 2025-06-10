import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import * as QRCode from 'qrcode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit {

  qrDataUrl: string | null = null;

  // esto hay que pasarlo a un objeto
  passengerName = 'Francisco Garcia';
  passengerDni = '12345678';
  flightNumber = 'AR1234';
  seatNumber = '12A';
  flightDate = new Date();

  constructor(private router: Router) { }

  ngOnInit() {
    this.generarCodigoQr(); //invoco a metodo para generar qr
  }

  generarCodigoQr() {
    const qrText = `
    Código QR generado con:
    Nombre: ${this.passengerName}
    DNI: ${this.passengerDni}
    N° Vuelo: ${this.flightNumber}
    Asiento: ${this.seatNumber}
    Fecha: ${this.flightDate.toLocaleDateString('es-AR')}`;

    // se usa la funcion QRCode.toDataURL de la libreria qrcode para generar una imagen
    // esta funcion devuelve una promesa que cuando se cumple se obtiene la imagen en base 64
    QRCode.toDataURL(qrText)
      .then((url) => {
        this.qrDataUrl = url;
      })
      .catch((err) => {
        console.error('Error generando QR:', err);
      });
  }

}
