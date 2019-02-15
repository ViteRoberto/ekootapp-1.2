import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acs',
  templateUrl: './acs.page.html',
  styleUrls: ['./acs.page.scss'],
})
export class AcsPage implements OnInit {

  constructor( private router: Router) {}

  ngOnInit() {
  }

}
