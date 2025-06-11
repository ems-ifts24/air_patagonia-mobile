import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts;

@Component({
  selector: 'app-qr',
  standalone: false,
  templateUrl: 'tarjeta-embarque.page.html',
  styleUrls: ['./tarjeta-embarque.page.scss'],
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

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    this.generarCodigoQr(); //invoco a metodo para generar qr
  }

  generarCodigoQr() {
    const qrText = `
    Código QR generado con:
    Nombre: ${this.nombrePasajero}
    DNI: ${this.dniPasajero}
    N° Vuelo: ${this.numeroVuelo}
    Asiento: ${this.numeroAsiento}
    Clase: ${this.clase}
    Fecha: ${this.fechaVuelo.toLocaleDateString('es-AR')}`;

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

  // private async verificarPermisos(): Promise<boolean> {

  //   // consulto permisos actuales
  //   const estadoPermiso = await Filesystem.checkPermissions();

  //   if (estadoPermiso.publicStorage === 'granted') {
  //     return true;
  //   }

  //   // sino los tiene los solicita
  //   const solicitudPermiso: PermissionStatus = await Filesystem.requestPermissions();

  //   return solicitudPermiso.publicStorage === 'granted';
  // }

  async descargarTarjetaEmbarque() {

    try {

      if (!this.qrDataUrl) {
        this.toast('Qr no generado');
        return;
      }

      // const permiso = await this.verificarPermisos();

      // if (!permiso) {
      //   this.toast('Permiso de almacenamiento denegado.');
      //   return;
      // }

      const { base64, nombreArchivo } = await this.generarPdfTarjetaEmbarque();

      await Filesystem.writeFile({
        path: `${nombreArchivo}`,
        data: base64,
        directory: Directory.Documents,
      });

      this.toast('Descarga exitosa');
    }
    catch (error: any) {
      this.toast('Error en la descarga');
    }
  }

  generarPdfTarjetaEmbarque(): Promise<{ base64: string, nombreArchivo: string }> {

    const nombreArchivo = `tarjeta_embarque_vuelo_${this.numeroVuelo}.pdf`;

    const docDefinition: any = {
      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [{ text: 'AirPatagonia', style: 'appName' }],
              [{ text: 'Tarjeta de Embarque', style: 'header' }]
            ]
          },
          layout: {
            defaultBorder: false,
            fillColor: () => '#003366'
          },
          alignment: 'center',
          margin: [0, 0, 0, 0]
        },

        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
      
                    // info pasajero y vuelo
                    {
                      columns: [
                        {
                          width: '50%',
                          stack: [
                            { text: 'PASAJERO', style: 'label' },
                            { text: this.nombrePasajero, style: 'value' },
                            { text: 'DOCUMENTO', style: 'label', margin: [0, 15, 0, 0] },
                            { text: this.dniPasajero, style: 'value' },
                            { text: 'ASIENTO', style: 'label', margin: [0, 15, 0, 0] },
                            { text: this.numeroAsiento, style: 'value' },
                          ],
                        },
                        {
                          width: '50%',
                          stack: [
                            { text: 'VUELO', style: 'label' },
                            { text: this.numeroVuelo, style: 'value' },
                            { text: 'FECHA', style: 'label', margin: [0, 15, 0, 0] },
                            { text: this.fechaVuelo.toLocaleDateString('es-AR'), style: 'value' },
                            { text: 'CLASE', style: 'label', margin: [0, 15, 0, 0] },
                            { text: this.clase, style: 'value' }
                          ],
                        }
                      ],
                      columnGap: -100,
                      margin: [0, 15, 0, 15],
                      alignment: 'center',
                    },
      
                    // salida y llegada
                    {
                      columns: [
                        {
                          width: '40%',
                          stack: [
                            { text: 'SALIDA', style: 'label', alignment: 'center', margin: [0, 10, 0, 5] },
                            { text: this.aeropuertoSalida, style: 'value', alignment: 'center' },
                            { text: this.ciudadSalida, style: 'valueSmall', alignment: 'center' },
                            { text: this.horaSalida, style: 'valueSmall', alignment: 'center' }
                          ],
                        },
                        {
                          width: '20%',
                          text: '->',
                          style: 'arrow',
                          alignment: 'center',
                          margin: [0, 20, 0, 0]
                        },
                        {
                          width: '40%',
                          stack: [
                            { text: 'LLEGADA', style: 'label', alignment: 'center', margin: [0, 10, 0, 5] },
                            { text: this.aeropuertoLlegada, style: 'value', alignment: 'center' },
                            { text: this.ciudadLlegada, style: 'valueSmall', alignment: 'center' },
                            { text: this.horaLlegada, style: 'valueSmall', alignment: 'center' }
                          ],
                        }
                      ],
                      columnGap: -50,
                      margin: [0, 5, 0, 15]
                    },
      
                    // embarque
                    { text: `EMBARQUE: ${this.horaEmbarque} - PUERTA ${this.puertaEmbarque}`, style: 'embarque' },
      
                    // qr
                    {
                      image: this.qrDataUrl,
                      width: 140,
                      alignment: 'center',
                      margin: [0, 20, 0, 10],
                    },
                    { text: 'Muestra este código al embarcar', alignment: 'center', fontSize: 11, margin: [0, 0, 0, 15] },
      
                    // indicaciones
                    { text: 'Indicaciones antes del vuelo', style: 'subheader', alignment: 'center', margin: [0, 10, 0, 6] },
                    {
                      table: {
                        widths: ['*'],
                        body: [
                          [{ text: '• Presentarse 1 hora antes en la puerta de embarque.', alignment: 'center' }],
                          [{ text: '• Documentación requerida: DNI o pasaporte vigente.', alignment: 'center' }],
                          [{ text: '• Equipaje de mano permitido: máximo 7kg (55x35x25cm).', alignment: 'center' }],
                          [{ text: '• No olvide revisar las restricciones de líquidos en equipaje de mano.', alignment: 'center' }]
                        ]
                      },
                      layout: 'noBorders',
                      margin: [0, 5, 0, 15]
                    }
      
                  ]
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
            fillColor: () => '#F5F5F5' // gris claro
          },
          margin: [0, 0, 0, 0]
        },

        // pie de pagina
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    { text: '¡Gracias por volar con AirPatagonia!', style: 'footerText' },
                    { text: 'Atención al cliente: 0810-222-7474 | www.airpatagonia.com', style: 'footerInfo' }
                  ],
                  alignment: 'center',
                  margin: [0, 10, 0, 10]
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
            fillColor: () => '#003366'
          },
          margin: [0, 0, 0, 0]
        }
      ],

      styles: {
        header: {
          fontSize: 19,
          bold: true,
          color: '#FFFFFF', 
          alignment: 'center',
          margin: [0, 0, 0, 5],
        },
        appName: {
          fontSize: 13,
          bold: true,
          color: '#FFFFFF', 
          alignment: 'center',
          margin: [0, 5, 0, 0],
        },
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 6],
          color: '#003366',
          alignment: 'center',
        },
        footerText: {
          fontSize: 11,
          bold: true,
          color: '#FFFFFF',
          alignment: 'center',
          margin: [0, 0, 0, 4]
        },
        footerInfo: {
          fontSize: 9,
          color: '#FFFFFF',
          alignment: 'center'
        },
        label: {
          fontSize: 10,
          bold: true,
          color: '#555555',
        },
        value: {
          fontSize: 12,
          bold: true,
        },
        valueSmall: {
          fontSize: 10,
        },
        embarque: {
          fontSize: 12,
          bold: true,
          alignment: 'center',
          color: '#000000',
          margin: [0, 15, 0, 10],
        },
        arrow: {
          fontSize: 16,
          bold: true,
          color: '#003366',
        }
      }
    };


    // genera el pdf con la libreria pdfmake y luego convierte el pdf a base64
    return new Promise((resolve, reject) => {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBase64((data) => {
        resolve({ base64: data, nombreArchivo });
      });
    });
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
}
