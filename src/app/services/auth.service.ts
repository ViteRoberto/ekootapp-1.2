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
  authNose:any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: DbService,
    private router: Router,
    private guardar: Storage,
    public facebook: Facebook
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => (user ? db.doc$('users/${user.uid}') : of(null)))
    );
  }

  facebookLogin(): Promise<any>{
    return this.facebook.login(['email'])
    .then( response => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
      // const facebookCredential = Firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
          this.infoFacebook = success;
          this.guardar.set('loggeado',true);
          this.router.navigateByUrl('/');
        });

    }).catch((error) => {
      console.log(error);
    });  
  }

  async anonymousLogin(){
    const credencial = await this.afAuth.auth.signInAnonymously();
    return await this.updateUserData(credencial.user);
  }

  private updateUserData({ uid, email, displayName, photoURL, isAnonymous }){
    const path = 'users/${uid}';
    
    const data = {
      uid,
      email,
      displayName,
      photoURL,
      isAnonymous
    };

    return this.db.updateAt(path, data);
  }

  async signOut(){
    await this.afAuth.auth.signOut();
    return this.router.navigateByUrl('/');
  }
}
