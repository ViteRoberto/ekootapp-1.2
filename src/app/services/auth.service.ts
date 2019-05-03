import firebase from 'firebase';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbService } from './db.service';
import { switchMap, take, map} from 'rxjs/operators';

import { Storage } from '@ionic/storage';

import { Facebook } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  infoFacebook:any;
  infoUser: any;
  userInfo: Observable<any>;
  authNose:any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private guardar: Storage,
    public facebook: Facebook
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$('usuarios/${user.uid}') : of(null)))
    );
  }

  facebookLogin(): Promise<any>{
    return this.facebook.login(['email'])
    .then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
          this.infoFacebook = success;
          this.guardar.set('loggeado',true);

          let uid = success.uid;
          this.guardar.set('uid',uid);
          let email = success.email;
          // this.guardar.set('email',email);
          let displayName = success.displayName;
          // this.guardar.set('displayName',displayName);
          let photoURL = success.photoURL;
          // this.guardar.set('photoURL',photoURL);
          let isAnonymous = success.isAnonymous;
          // this.guardar.set('isAnonymous',isAnonymous);

          let ekoins = 0;
          let pp = 0;
          let bp = 0;
          let rn = 0;
          let ds = 0;

          this.updateUserData({uid, email, displayName, photoURL, isAnonymous, ekoins, pp, bp, rn, ds});
          this.router.navigateByUrl('/');
        });

    }).catch((error) => {
      console.log(error);
    });  
  }

  async anonymousLogin(){
    const credencial = await this.afAuth.auth.signInAnonymously();
    // return await this.updateUserData(credencial.user);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous, ekoins, pp, bp, rn, ds }){
    let path = 'usuarios/';
    path = path.concat(uid);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous,
      ekoins,
      pp,
      bp,
      rn,
      ds

    };

    return this.db.updateAt(path, data);
  }

  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigateByUrl('/');
  }
}
