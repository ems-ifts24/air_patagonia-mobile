import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule,RouterLink]
})
export class ContactoPage implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      codigoVuelo: ['', Validators.required],
      nombre: ['', Validators.required],
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
}