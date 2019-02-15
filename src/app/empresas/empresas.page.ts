import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.page.html',
  styleUrls: ['./empresas.page.scss'],
})
export class EmpresasPage implements OnInit {

  constructor(private router: Router) { }

  async reto(){
    this.router.navigateByUrl('/reto');
  }

  ngOnInit() {
  }

}
