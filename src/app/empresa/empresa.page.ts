import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  id:string;
  nombre:string;
  logo:string;
  imagen:string;
  web:string;
  facebook:string;
  fbid:string;
  instagram:string;
  descripcion:string;
  impactos:string;

  constructor(public alerta: AlertController, private enApp: InAppBrowser, public plataforma: Platform, private rutaActiva: ActivatedRoute, private disponible: AppAvailability) { }

  abrirUrl(app: string){
    if(this.plataforma.is('android')){
      var appUrl = 'fb://page/'+this.fbid;
    }else{
      var appUrl = 'fb://page?id='+this.fbid;
    }
    switch(app){
      case 'facebook':
        this.lanzarApp('fb://','com.facebook.katana',appUrl,'https://www.facebook.com/'+this.facebook);
        break;
      case 'instagram':
        this.lanzarApp('instagram://', 'com.instagram.android','instagram://user?username='+this.instagram,'https://instagram.com/'+this.instagram);
        break;
    }
  }

  private lanzarApp(iosApp: string, androidApp: string, appUrl: string, webUrl: string){
    var app:string;
    if(this.plataforma.is('ios')){
      app = iosApp;
    }else if(this.plataforma.is('android')){
      app = androidApp;
    }else{
      this.enApp.create(webUrl,'_system');
      return;
    }

    this.disponible.check(app).then( () => {
      this.enApp.create(appUrl,'_system');
    },
    () => {
      this.enApp.create(webUrl,'_system');
    });
  }


  ngOnInit() {

    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    this.nombre = this.rutaActiva.snapshot.paramMap.get('nombre');
    this.logo = this.rutaActiva.snapshot.paramMap.get('logo');
    this.imagen = this.rutaActiva.snapshot.paramMap.get('imagen');
    this.web = this.rutaActiva.snapshot.paramMap.get('web');
    this.facebook = this.rutaActiva.snapshot.paramMap.get('facebook');
    this.fbid = this.rutaActiva.snapshot.paramMap.get('fbid');
    this.instagram = this.rutaActiva.snapshot.paramMap.get('instagram');
    this.descripcion = this.rutaActiva.snapshot.paramMap.get('descripcion');
    

  }

}
