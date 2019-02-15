import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RetoPage } from '../reto/reto.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public controlModal: ModalController, public alerta: AlertController) { }

  async datosPerfil(){
    const alertaPerfil = await this.alerta.create({
      header: 'ALERTA',
      subHeader: 'Hola',
      message: 'Aqui va una imagen',
      buttons: ['OK']
    });
    await alertaPerfil.present();
  }

  async respeto(){
    const alertaRespeto = await this.alerta.create({
      header: 'RESPETO A LA NATURALEZA',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/1-respetoalanaturaleza.png"></ion-col><ion-col><h1>+26 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que procuran el medio ambiente</br>',
      cssClass: 'alertaRespeto',
      buttons: ['Más info...']
    });
    await alertaRespeto.present();
  }

  async desarrollo(){
    const alertaDesarrollo = await this.alerta.create({
      header: 'DESARROLLO SOCIAL',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/1-desarrollosocial.png"></ion-col><ion-col><h1>+43 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que fomentan un crecimiento en sociedad</br>',
      cssClass: 'alertaDesarrollo',
      buttons: ['Más info...']
    });
    await alertaDesarrollo.present();
  }

  async bienestar(){
    const alertaBienestar = await this.alerta.create({
      header: 'BIENESTAR PERSONAL',
      message: '<ion-grid><ion-row><ion-col><img src="../../assets/img/acciones/1-bienestarpersonal.png"></ion-col><ion-col><h1>+12 Ptos</h1></ion-col></ion-row></ion-grid><p>Son todas aquellas acciones que realizar en pro de un crecimiento y salud personal</br>',
      cssClass: 'alertaBienestar',
      buttons: ['Más info...']
    });
    await alertaBienestar.present();
  }

  // async cumplirReto(){
  //   const modal1 = await this.controlModal.create({
  //     component: RetoPage,
  //     componentProps: { value: 123 }
  //   });
  //   await modal1.present();
  // }

  ngOnInit() {
  }

}
