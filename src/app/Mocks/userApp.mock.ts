import { Credenciales, UserApp } from "../models/userApp.model";
 
export const credencialesFrancisco: Credenciales = {
    dni: 12345678,
    contrasenia: 'user'
}

export const userFrancisco: UserApp = {
    nombre: 'Francisco',
    apellido: 'Garcia',
    telefono: '12345678',
    email: 'francisco.garcia@mail.com',
    credenciales: credencialesFrancisco,
}
