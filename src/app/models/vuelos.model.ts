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