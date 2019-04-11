import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DbService } from './../services/db.service';

@Component({
  selector: 'app-retos',
  templateUrl: './retos.page.html',
  styleUrls: ['./retos.page.scss'],
})
export class RetosPage implements OnInit {

  id:string;
  retos:any;

  constructor(private empresaServicio: DbService, public rutaActiva: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.rutaActiva.snapshot.paramMap.get('id');
    if(this.id){
      this.empresaServicio.getRetos(this.id).subscribe(res => {
        this.retos = res;
        console.log(this.retos);
      })
    }else{
        this.empresaServicio.getTodosRetos().subscribe(res => {
          this.retos = res;
          console.log(this.retos);
        })
    }
  }
}
