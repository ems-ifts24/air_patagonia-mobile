import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonContent, IonItem, IonInput, IonButton, IonText, ToastController, IonNote, IonInputPasswordToggle } from '@ionic/angular/standalone';
import { LoginService } from '../services/login.service';
import { Credenciales } from '../models/userApp.model';
import { SharedModule } from '../shared/shared.module';


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
    IonInput,
    IonButton,
    IonText,
    IonNote,
    IonInputPasswordToggle,
    SharedModule
  ]
})

export class LoginPage implements OnInit {

  formulario: FormGroup;
  dni: string = '';
  password: string = '';

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private toastController: ToastController,
    private loginService: LoginService) {
    this.formulario = this.fb.group({
      dni: [null, [
        Validators.required
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8)
      ]]
    });
  }

  // toma y setea los valores ingresados en los inputs
  // Función para validar que solo se ingresen números
  soloNumeros(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    
    if (!pattern.test(inputChar)) {
      event.preventDefault();
      this.mostrarError('Solo se permiten números');
      return false;
    }
    return true;
  }

  // Muestra un mensaje de error
  async mostrarError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }

  ngOnInit(): void {
    this.loginService.reinicioCredencialesPorDefecto();

    this.formulario.get('dni')?.valueChanges.subscribe((value) => {
      this.dni = value.toString();
      
    });
    this.formulario.get('password')?.valueChanges.subscribe((value) => {
      this.password = value.toString();
      
    });
    
  }

  async login() {
    const dniIngresado = this.formulario.value.dni;
    const contraseniaIngresada = this.formulario.value.password;
  
    const credenciales: Credenciales = {
      dni: dniIngresado,
      contrasenia: contraseniaIngresada
    };
  
    const esValido = await this.loginService.validarCredenciales(credenciales);
  
    if (esValido) {
      this.router.navigate(['/home']);
    } else {
      this.toast('DNI o contraseña incorrectos');
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
