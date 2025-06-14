import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa el operador map

export interface Vuelo {
  id: number;
  codigo: string;
  origen: string;
  destino: string;
  fecha: string;
  hora: string;
  status: string;
  asiento: string;
  pasajero: string;
}

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl = 'http://localhost:3000/vuelos';

  constructor(private http: HttpClient) {}

  obtenerVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.apiUrl);
  }

  // obtenerVueloPorCodigo(codigo:string): Observable<Vuelo> {
  //   return this.http.get<Vuelo>(`${this.apiUrl}?${codigo}`);
  // }

   obtenerVueloPorCodigo(codigo: string): Observable<Vuelo | undefined> { // Puede devolver Vuelo o undefined
    // La URL correcta para json-server sería: http://localhost:3000/vuelos?codigo=AR1234
    return this.http.get<Vuelo[]>(`${this.apiUrl}?codigo=${codigo}`).pipe(
      map(vuelos => {
        // json-server siempre devuelve un array, incluso si solo hay un resultado
        // o ninguno. Tomamos el primer elemento si existe.
        return vuelos.length > 0 ? vuelos[0] : undefined;
      })
    );
  }
}

