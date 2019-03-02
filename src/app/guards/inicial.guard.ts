import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class InicialGuard implements CanActivate {
  constructor(private guardar: Storage, private router: Router){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
      const estaLogin = await this.guardar.get('loggeado');

      if(!estaLogin){
        this.router.navigateByUrl('/inicial');
      }

      return estaLogin;

  }
}
