import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class LoginComponent implements OnInit {
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
