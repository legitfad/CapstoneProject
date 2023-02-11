import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router, private toastCtrl: ToastController) {}
 
  canActivate(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      onAuthStateChanged(this.auth, async user => {
        if (user) {
          this.router.navigateByUrl('/overview', { replaceUrl: true});
          reject(false);
        } else { 
          resolve(true);
        }
      })
    });
  }
  
}
