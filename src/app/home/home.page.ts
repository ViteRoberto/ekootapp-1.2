import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RetoComponent } from './reto/reto.component';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { DbService } from '../services/db.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private dbServicio: DbService, private social: SocialSharing, public controlModal: ModalController, public alerta: AlertController, public router:Router, public auth: AuthService) { }

  retos:any;

  async compartir(){
    this.social.shareViaFacebookWithPasteMessageHint(null,null,'ekoot.mx',null).then(() => {
      this.alertaAmber('¡ÉXITO!');
    }).catch(e => {
      this.alertaAmber(e);
    })
  }

  async alertaAmber(e){
    const alertaCompartir = await this.alerta.create({
      header: 'ALERTA',
      message: e,
      buttons: ['Ok']
    });
    await alertaCompartir.present();
  }

  async datosPerfil(){
    const alertaPerfil = await this.alerta.create({
      header: 'Perfil',
      subHeader: this.auth.infoFacebook.displayName,
      message: '<img src="'+this.auth.infoFacebook.photoURL+'">',
      buttons: ['OK']
    });
    await alertaPerfil.present();
  }

  async abrirInicial(){
    this.router.navigateByUrl('/inicial');
  }

  async respeto(){
    const alertaRespeto = await this.alerta.create({
      header: 'RESPETO A LA NATURALEZA',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/rn.png"></ion-col><ion-col><h1>+26 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que procuran el medio ambiente</br>',
      cssClass: 'alertaRespeto',
      buttons: ['Más info...']
    });
    await alertaRespeto.present();
  }

  async desarrollo(){
    const alertaDesarrollo = await this.alerta.create({
      header: 'DESARROLLO SOCIAL',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/ds.png"></ion-col><ion-col><h1>+43 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que fomentan un crecimiento en sociedad</br>',
      cssClass: 'alertaDesarrollo',
      buttons: ['Más info...']
    });
    await alertaDesarrollo.present();
  }

  async bienestar(){
    const alertaBienestar = await this.alerta.create({
      header: 'BIENESTAR PERSONAL',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/bp.png"></ion-col><ion-col><h1>+12 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que realizar en pro de un crecimiento y salud personal</br>',
      cssClass: 'alertaBienestar',
      buttons: ['Más info...']
    });
    await alertaBienestar.present();
  }

  async cumplirReto(){
    const modal1 = await this.controlModal.create({
      component: RetoComponent,
      componentProps: { value: 123 }
    });
    await modal1.present();
  }

  ngOnInit() {

    this.dbServicio.getTodosRetos().subscribe(res => {
      this.retos = res;
      console.log(this.retos);
    })
  }

}
