import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonText 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonText
  ]
})
export class LoginPage implements OnInit {
  constructor(private router: Router) { }
  
  ngOnInit() {}

  // Variables para el formulario
  dni: number | null = null;
  password: string = '';

  login() {
    if (this.dni === 12345678 && this.password === '12345678') {
      this.router.navigate(['/home']);
    } else {
      alert('DNI o contraseña incorrectos');
    }
  }
}
