import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
