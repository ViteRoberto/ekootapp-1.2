import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ProfileComponent, LoginComponent],
  exports: [ProfileComponent, LoginComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule { }
