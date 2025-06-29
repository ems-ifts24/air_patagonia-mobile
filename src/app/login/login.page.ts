import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Credenciales } from '../models/userApp.model';
import { SharedModule } from '../shared/shared.module';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule
  ]
})

export class LoginPage implements OnInit {

  formulario: FormGroup;
  dni: number = 0;
  password: string = '';

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private toastController: ToastController,
    private loginService: LoginService) {
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

    this.loginService.iniciarCredencialesPorDefecto();

    this.formulario.get('dni')?.valueChanges.subscribe((value) => {
      this.dni = value;
    });
    this.formulario.get('password')?.valueChanges.subscribe((value) => {
      this.password = value;
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
