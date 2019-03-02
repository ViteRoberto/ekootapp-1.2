import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TutorialGuard implements CanActivate {
  constructor (private guardar: Storage, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const estaCompleto = await this.guardar.get('tutorialCompleto');

    if(!estaCompleto){
      this.router.navigateByUrl('/tutorial');
    }
    
    return estaCompleto;

  }
}
