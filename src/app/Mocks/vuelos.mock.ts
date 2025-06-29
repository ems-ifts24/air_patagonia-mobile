export interface Vuelo {
    codigo: string;
    origen: string;
    destino: string;
    estado: string;
    asiento: string;
    clase: string;
    fechaVuelo: Date;
    esInternacional: boolean;
    aeropuertoSalida: string;
    aeropuertoLlegada: string;
    horaSalida: Date;
    horaLlegada: Date;
    puertaEmbarque: string;
}

export const listaVuelos: Vuelo[] = [
    {
        codigo: 'AR1234', origen: 'Buenos Aires', destino: 'Bariloche', estado: 'Confirmado', asiento: '12A', clase: 'Turista', fechaVuelo: new Date('2025-07-02'),
        esInternacional: false, aeropuertoSalida: 'AEP', aeropuertoLlegada: 'BRC', horaSalida: new Date('2025-07-02T11:45'), horaLlegada: new Date('2025-07-02T12:45'), puertaEmbarque: '8'
    },
    {
        codigo: 'AR1235', origen: 'Buenos Aires', destino: 'Montevideo', estado: 'Pendiente', asiento: '10B', clase: 'Turista', fechaVuelo: new Date('2025-09-07'),
        esInternacional: true, aeropuertoSalida: 'EAP', aeropuertoLlegada: 'MVD', horaSalida: new Date('2025-09-07T09:30'), horaLlegada: new Date('2025-09-07T10:50'), puertaEmbarque: ''
    },
    {
        codigo: 'AR1236', origen: 'Buenos Aires', destino: 'Mar del Plata', estado: 'Pendiente', asiento: '2A', clase: 'Business', fechaVuelo: new Date('2025-08-15'),
        esInternacional: false, aeropuertoSalida: 'EZE', aeropuertoLlegada: 'MDQ', horaSalida: new Date('2025-08-15T10:00'), horaLlegada: new Date('2025-08-15T10:50'), puertaEmbarque: ''
    },
    {
        codigo: 'AR1237', origen: 'Buenos Aires', destino: 'Tucuman', estado: 'Pendiente', asiento: '18C', clase: 'Turista', fechaVuelo: new Date('2025-10-15'),
        esInternacional: false, aeropuertoSalida: 'EZE', aeropuertoLlegada: 'TUC', horaSalida: new Date('2025-10-15T12:00'), horaLlegada: new Date('2025-10-15T13:45'), puertaEmbarque: ''
    }
];


export interface NotificacionVuelo {
    codigoVuelo: string;
    fechaNotificacion: Date;
}

export const listaNotificaciones: NotificacionVuelo[] = [
    {
        codigoVuelo: 'AR1234', fechaNotificacion: new Date('2025-07-02T11:45')
    },
    {
        codigoVuelo: 'AR1235', fechaNotificacion: new Date('2025-09-07T09:30')
    },
    {
        codigoVuelo: 'AR1236', fechaNotificacion: new Date('2025-08-15T10:00')
    },
    {
        codigoVuelo: 'AR1237', fechaNotificacion: new Date('2025-10-15T12:00')
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

export interface datosQR {
    nombrePasajero: string;
    dniPasajero: string;
    numeroVuelo: string;
    numeroAsiento: string;
    clase: string;
    fechaVuelo: Date;
    aeropuertoSalida: string;
    ciudadSalida: string;
    horaSalida: Date;
    aeropuertoLlegada: string;
    ciudadLlegada: string;
    horaLlegada: Date;
    horaEmbarque: Date;
    puertaEmbarque: string;
}