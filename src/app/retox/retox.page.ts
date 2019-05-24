import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbService } from '../services/db.service';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as watermark from 'watermarkjs';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-retox',
  templateUrl: './retox.page.html',
  styleUrls: ['./retox.page.scss'],
})
export class RetoxPage implements OnInit {

  @ViewChild('previewImage') waterMarkImage: ElementRef;

  originalImage = null;
  blobImage = null;

  id:string;
  fraseimagen:string;
  imagen:string;
  sabiasque:string;
  reto:string;

  constructor(private compartir: SocialSharing, private alerta: AlertController, private router: Router, private activa:ActivatedRoute, private db: DbService, private camara: Camera) { }

  async funcionCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
      // sourceType: this.camara.PictureSourceType.PHOTOLIBRARY
    }
    this.camara.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.originalImage = 'data:image/jpeg;base64,' + imageData;   
      
      fetch(this.originalImage)
        .then(res => res.blob())
        .then(blob => {
          this.blobImage = blob;
          watermark([this.blobImage, '../../assets/img/watermark.png'])
            .image(watermark.image.lowerRight(0.6))
            .then(img => {
              // this.waterMarkImage.nativeElement.src = img.src;
              this.compartirFacebook(img.src);
            });
        });

    }, (err) => {
      // Handle error
     });
  }  

  async lanzarAlerta(e){
    const alertaCompartir = await this.alerta.create({
      header: '¡COMPARTIDO',
      message: '<ion-grid><ion-row><ion-col><img src="'+e+'"></ion-col></ion-row></ion-grid>',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('/');
        }
      }]
    });
    await alertaCompartir.present();
  }

  async alertando(mensaje){
    const alerta1 = await this.alerta.create({
      header: 'COMPARTI',
      message: mensaje,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigateByUrl('/');
        }
      }]
    });
    await alerta1.present();
  }

  async compartirFacebook(file){
    this.compartir.shareViaFacebook('Your Actions Matter',file,'ekoot.mx').then(mensaje => {
      this.alertando(mensaje);
    }).catch((e) => {
      this.alertando(e);
    });
  }

  // async addImageWaterMark(){
  //   watermark([this.blobImage, '../../assets/img/watermark.png'])
  //     .image(watermark.image.lowerRight(0.6))
  //     .then(img => {
  //       this.waterMarkImage.nativeElement.src = img.src;
  //     });
  // }

  ngOnInit() {
    this.id = this.activa.snapshot.paramMap.get('id');

    this.db.getInfoReto(this.id).subscribe(res => {
      this.fraseimagen = res['fraseimagen'];
      this.imagen = res['imagen'];
      this.sabiasque = res['sabiasque'];
      this.reto = res['reto'];

    })
  }

}
