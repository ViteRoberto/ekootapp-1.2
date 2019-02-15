import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  id2;

  constructor(private activa: ActivatedRoute) { }

  ngOnInit() {
    this.id2 = this.activa.snapshot.paramMap.get('id');
    console.log(this.id2);
  }

}
