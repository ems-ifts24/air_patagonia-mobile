export interface Credenciales {
    dni: number;
    contrasenia: string;
}

export interface UserApp {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    credenciales: Credenciales;
}