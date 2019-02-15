import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';
import { RetoComponent } from './reto/reto.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'reto',
    component: RetoComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage, RetoComponent],
  entryComponents: []
})
export class HomePageModule {}
