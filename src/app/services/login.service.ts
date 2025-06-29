import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Credenciales } from '../models/userApp.model';
import { credencialesFrancisco } from '../Mocks/userApp.mock';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private STORAGE_KEY = 'credenciales';

  constructor() { }

  async iniciarCredencialesPorDefecto() {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });

    if (!value) {
      await Preferences.set({ key: this.STORAGE_KEY, value: JSON.stringify(credencialesFrancisco) });
    }
  }

  async validarCredenciales(credenciales: Credenciales): Promise<boolean> {
    const respuesta = await Preferences.get({ key: this.STORAGE_KEY });
    const value = respuesta.value;

    if (!value) return false;

    const credGuardadas: Credenciales = JSON.parse(value);
    return (
      credenciales.dni === credGuardadas.dni &&
      credenciales.contrasenia === credGuardadas.contrasenia
    );
  }
}
