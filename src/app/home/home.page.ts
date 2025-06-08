import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList } from '@ionic/angular/standalone';
import { MisVuelosComponent } from '../components/mis-vuelos/mis-vuelos.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, FormsModule,MisVuelosComponent],
})
export class HomePage {
  titulo: string = 'Listado de';

  tareas: string[];

  nuevaTarea = '';

  constructor() {
    const tareasGuardadas = localStorage.getItem('tareas')
    this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas))
  }

  agregarTarea() {
    const tareaTrim = this.nuevaTarea.trim()

    if (!tareaTrim) return;

    this.tareas.push(tareaTrim)

    this.nuevaTarea = ''

    this.guardarTareas()
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1)

    this.guardarTareas();
  }
}
