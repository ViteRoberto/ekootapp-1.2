import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, AlertController } from '@ionic/angular';

import { DbService } from './../services/db.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  empresa:any;
  impactos:any;
  categorias:any;

  id:string;

  constructor(private router: Router, private empresaServicio: DbService, public alerta: AlertController, private enApp: InAppBrowser, public plataforma: Platform, private rutaActiva: ActivatedRoute, private disponible: AppAvailability) { }

  async retos(){
    this.router.navigateByUrl('/retos/'+this.id);
  }

  abrirUrl(app: string){
    if(this.plataforma.is('android')){
      var appUrl = 'fb://page/'+this.empresa.fbid;
    }else{
      var appUrl = 'fb://page?id='+this.empresa.fbid;
    }
    switch(app){
      case 'facebook':
        this.lanzarApp('fb://','com.facebook.katana',appUrl,'https://www.facebook.com/'+this.empresa.facebook);
        break;
      case 'instagram':
        this.lanzarApp('instagram://', 'com.instagram.android','instagram://user?username='+this.empresa.instagram,'https://instagram.com/'+this.empresa.instagram);
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
    
    this.empresaServicio.getEmpresa(this.id).subscribe(res => {
      this.empresa = res;
    })

    this.empresaServicio.getImpactos(this.id).subscribe(res => {
      this.impactos = res;
    })

    this.empresaServicio.getCategorias(this.id).subscribe(res => {
      this.categorias = res;
    })

  }

}
