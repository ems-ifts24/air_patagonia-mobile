import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';
import { Filesystem, Directory } from '@capacitor/filesystem'; //plugin para guardar archivos
import { FileOpener } from '@capawesome-team/capacitor-file-opener'; //plugin para abrir el pdf
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class TarjetaEmbarqueService {
  constructor() {
    (pdfMake as any).vfs = pdfFonts;
  }

  async generarCodigoQr(datos: any): Promise<string> {

    try {
      const qrText = `Código QR generado con:
      Nombre: ${datos.nombrePasajero}
      DNI: ${datos.dniPasajero}
      N° Vuelo: ${datos.numeroVuelo}
      Asiento: ${datos.numeroAsiento}
      Clase: ${datos.clase}
      Fecha: ${datos.fechaVuelo.toLocaleDateString('es-AR')}`;

      // se usa la funcion QRCode.toDataURL de la libreria qrcode para generar una imagen
      // esta funcion devuelve una promesa que cuando se cumple se obtiene la imagen en base 64
      return await QRCode.toDataURL(qrText);

    } catch (error) {
      console.error('Error generando QR:', error);
      throw error;
    }

  }

  async generarPdfTarjetaEmbarque(datos: any, qrDataUrl: string): Promise<{ base64: string, nombreArchivo: string }> {
    const nombreArchivo = `tarjeta_embarque_vuelo_${datos.numeroVuelo}.pdf`;

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
                            { text: datos.nombrePasajero, style: 'value' },
                            { text: 'DOCUMENTO', style: 'label', margin: [0, 15, 0, 0] },
                            { text: datos.dniPasajero, style: 'value' },
                            { text: 'ASIENTO', style: 'label', margin: [0, 15, 0, 0] },
                            { text: datos.numeroAsiento, style: 'value' },
                          ],
                        },
                        {
                          width: '50%',
                          stack: [
                            { text: 'VUELO', style: 'label' },
                            { text: datos.numeroVuelo, style: 'value' },
                            { text: 'FECHA', style: 'label', margin: [0, 15, 0, 0] },
                            { text: datos.fechaVuelo.toLocaleDateString('es-AR'), style: 'value' },
                            { text: 'CLASE', style: 'label', margin: [0, 15, 0, 0] },
                            { text: datos.clase, style: 'value' }
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
                            { text: datos.aeropuertoSalida, style: 'value', alignment: 'center' },
                            { text: datos.ciudadSalida, style: 'valueSmall', alignment: 'center' },
                            { text: datos.horaSalida, style: 'valueSmall', alignment: 'center' }
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
                            { text: datos.aeropuertoLlegada, style: 'value', alignment: 'center' },
                            { text: datos.ciudadLlegada, style: 'valueSmall', alignment: 'center' },
                            { text: datos.horaLlegada, style: 'valueSmall', alignment: 'center' }
                          ],
                        }
                      ],
                      columnGap: -50,
                      margin: [0, 5, 0, 15]
                    },

                    // embarque
                    { text: `EMBARQUE: ${datos.horaEmbarque} - PUERTA ${datos.puertaEmbarque}`, style: 'embarque' },

                    // qr
                    {
                      columns: [
                        {
                          width: '*',
                          text: ''
                        },
                        {
                          image: qrDataUrl,
                          width: 140,
                          alignment: 'center',
                          margin: [0, 20, 0, 10]
                        },
                        {
                          width: '*',
                          text: ''
                        }
                      ]
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
    return new Promise((resolve) => {
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBase64((data) => {
        resolve({ base64: data, nombreArchivo });
      });
    });
  }

  async descargarTarjeta(base64: string, nombreArchivo: string): Promise<void> {

    try {
      
      // crea el pdf en el directorio privado de la app
      const result = await Filesystem.writeFile({
        path: nombreArchivo,
        data: base64,
        directory: Directory.Data,
        // directory: Directory.Documents,

      });

      // abre el pdf en la app
      await FileOpener.openFile({
        path: result.uri, 
        mimeType: 'application/pdf',
      });

    } catch (error) {
      console.error('Error al descargar la tarjeta:', error);
      throw error;
    }

  }
}
