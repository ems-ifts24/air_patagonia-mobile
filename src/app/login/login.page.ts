import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit() {}

  login() {
    const usuario = document.getElementById('dni') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    if (usuario.value === '12345678' && password.value === '12345678') {
      this.router.navigate(['/app/mis-vuelos']); // redirige a la ruta mis vuelos
    }else{
      alert('DNI o contraseña incorrectos');
    }
  }
}
