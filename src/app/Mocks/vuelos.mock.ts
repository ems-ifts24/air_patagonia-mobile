import { Vuelo } from "../models/vuelos.model";

export const listaVuelos: Vuelo[] = [
    {
      codigo: 'AR1234',
      origen: 'Buenos Aires',
      destino: 'Bariloche',
      estado: 'Confirmado',
      asiento: '12A',
      clase: 'Turista',
      esInternacional: false,
      aeropuertoSalida: 'AEP',
      aeropuertoLlegada: 'BRC',
      fechaVuelo: new Date(Date.UTC(2025, 6, 2)), // 2 julio 2025
      horaSalida: new Date(Date.UTC(2025, 6, 2, 11, 45)),
      horaLlegada: new Date(Date.UTC(2025, 6, 2, 12, 45)),
      puertaEmbarque: '8'
    },
    {
      codigo: 'AR1235',
      origen: 'Buenos Aires',
      destino: 'Montevideo',
      estado: 'Pendiente',
      asiento: '10B',
      clase: 'Turista',
      esInternacional: true,
      aeropuertoSalida: 'EAP',
      aeropuertoLlegada: 'MVD',
      fechaVuelo: new Date(Date.UTC(2025, 8, 7)), // 7 sep
      horaSalida: new Date(Date.UTC(2025, 8, 7, 9, 30)),
      horaLlegada: new Date(Date.UTC(2025, 8, 7, 10, 50)),
      puertaEmbarque: ''
    },
    {
      codigo: 'AR1236',
      origen: 'Buenos Aires',
      destino: 'Mar del Plata',
      estado: 'Pendiente',
      asiento: '2A',
      clase: 'Business',
      esInternacional: false,
      aeropuertoSalida: 'EZE',
      aeropuertoLlegada: 'MDQ',
      fechaVuelo: new Date(Date.UTC(2025, 7, 15)), // 15 ago
      horaSalida: new Date(Date.UTC(2025, 7, 15, 10, 0)),
      horaLlegada: new Date(Date.UTC(2025, 7, 15, 10, 50)),
      puertaEmbarque: ''
    },
    {
      codigo: 'AR1237',
      origen: 'Buenos Aires',
      destino: 'Tucuman',
      estado: 'Pendiente',
      asiento: '18C',
      clase: 'Turista',
      esInternacional: false,
      aeropuertoSalida: 'EZE',
      aeropuertoLlegada: 'TUC',
      fechaVuelo: new Date(Date.UTC(2025, 9, 15)), // 15 oct
      horaSalida: new Date(Date.UTC(2025, 9, 15, 12, 0)),
      horaLlegada: new Date(Date.UTC(2025, 9, 15, 13, 45)),
      puertaEmbarque: ''
    }
  ];
  


export interface NotificacionVuelo {
    codigoVuelo: string;
    fechaNotificacion: Date;
}

export const listaNotificaciones: NotificacionVuelo[] = [
    {
        codigoVuelo: 'AR1234', fechaNotificacion: new Date(Date.UTC(2025, 6, 2, 11, 45))
    },
    {
        codigoVuelo: 'AR1235', fechaNotificacion: new Date(Date.UTC(2025, 8, 7, 9, 30))
    },
    {
        codigoVuelo: 'AR1236', fechaNotificacion: new Date(Date.UTC(2025, 7, 15, 10, 0))
    },
    {
        codigoVuelo: 'AR1237', fechaNotificacion: new Date(Date.UTC(2025, 9, 15, 12, 0))
    }
];


export interface Coordenadas {
    latitud: number;
    longitud: number;
}

export const coordenadasAEP = {
    latitud: -34.5614,
    longitud: -58.4156
};

export const coordenadasEZE = {
    latitud: -34.8125,
    longitud: -58.5398
};

