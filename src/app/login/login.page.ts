import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports:[IonicModule,RouterLink]
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit() {}

  login() {
    const usuario = document.getElementById('dni') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    if (usuario.value === '12345678' && password.value === '12345678') {
      this.router.navigate(['/home']); // redirige a la ruta mis vuelos
    }else{
      alert('DNI o contraseña incorrectos');
    }
  }
}
