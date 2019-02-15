import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(private guardar: Storage, private router: Router) { }

  @ViewChild(IonSlides)
  slides: IonSlides;

  async finTutorial(){
    await this.guardar.set('tutorialCompleto', true);
    this.router.navigateByUrl('/');
  }

  next(){
    this.slides.slideNext();
  }

  ngOnInit() {
  }

}
