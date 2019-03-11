import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Empresa, DbService } from './../services/db.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {

  empresas: Empresa[];

  constructor(private router: Router, private empresaServicio: DbService) { }

  ngOnInit() {
    this.empresaServicio.getEmpresas().subscribe(res => {
      this.empresas = res;
    })
  }

}
