import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.page.html',
  styleUrls: ['./inicial.page.scss'],
})
export class InicialPage implements OnInit {

  constructor(public router: Router, public auth: AuthService) { }

  moverFocus(event,siguienteInput){
    if(event.key == "Enter"){
      siguienteInput.setFocus();
    }
  }

  entrar(){
    // this.router.navigateByUrl('/');
    this.auth.facebookLogin();
  }

  ngOnInit() {
  }

}
