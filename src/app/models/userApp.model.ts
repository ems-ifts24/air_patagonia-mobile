export interface Credenciales {
    dni: string;
    contrasenia: string;
}

export interface UserApp {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    credenciales: Credenciales;
}