import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText
  ]
})

export class LoginPage implements OnInit {

  formulario: FormGroup;
  dni: number = 0;
  password: string = '';

  constructor(private router: Router, private fb: FormBuilder, private toastController: ToastController) {
    this.formulario = this.fb.group({
      dni: [null, [
        Validators.required, 
        Validators.min(10000000), 
        Validators.max(99999999)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8)
      ]]
    });
  }

  // toma y setea los valores ingresados en los inputs
  ngOnInit(): void {
    this.formulario.get('dni')?.valueChanges.subscribe((value) => {
      this.dni = value;
    });
    this.formulario.get('password')?.valueChanges.subscribe((value) => {
      this.password = value;
    });
  }

  login() {

    const dniIngresado = this.formulario.value.dni;
    const passIngresada = this.formulario.value.password;
  
    const dniCorrecto = 12345678;
    const passCorrecta = '12345678';
  
    if (dniIngresado === dniCorrecto && passIngresada === passCorrecta) {
      this.router.navigate(['/home']);
    } else if (dniIngresado !== dniCorrecto && passIngresada !== passCorrecta) {
      this.toast('El DNI y la contraseña son incorrectos');
    } else if (dniIngresado !== dniCorrecto) {
      this.toast('El DNI es incorrecto');
    } else if (passIngresada !== passCorrecta) {
      this.toast('La contraseña es incorrecta');
    }
  }
  

  // metodo para mostrar msj emergente temporal
  async toast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      cssClass: 'custom-toast',
    });
    toast.present();
  }
}
