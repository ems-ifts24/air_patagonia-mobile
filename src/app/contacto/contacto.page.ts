import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    NgClass
  ]
})
export class ContactoPage implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      codigoVuelo: ['', [Validators.required,Validators.minLength(6)]],
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9\-\+]{7,15}$/)]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit() {}

  enviarFormulario() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      alert('Formulario enviado con éxito');
      this.formulario.reset();
    } else {
      alert('Por favor, completá todos los campos.');
    }
  }
  tieneErrores(control:string, validator:string){
 return this.formulario.get(control)?.hasError(validator)&& this.formulario.get(control)?.touched;
}

}