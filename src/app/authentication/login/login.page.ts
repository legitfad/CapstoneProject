import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authSvc: AuthService, 
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.credentialsForm = this.fb.group({
      email: ['test@test2.com', [Validators.email, Validators.required]],
      password: ['123456', [Validators.minLength(6), Validators.required]]
    })
  }
 
  async register() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
 
    this.authSvc.signup(this.credentialsForm.value).then(_ => {
      loading.dismiss();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }, async err => {
      await loading.dismiss();
 
      const alert = await this.alertCtrl.create({
        header: 'Signup failed',
        message: 'Please try again later. Reason: ' + err,
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  async login() {    
    const loading = await this.loadingCtrl.create();
    await loading.present();
 
    this.authSvc.login(this.credentialsForm.value).then(user => {
      console.log(user);

      let router = (user.user.displayName === 'admin') ? '/control' :
      (user.user.displayName === 'Admin123') ? '/control' :
      (user.user.displayName === 'Admin223') ? '/control' :
      (user.user.displayName === 'Admin323') ? '/control' :
      '/' ;
      
      loading.dismiss();

      this.router.navigateByUrl(router, { replaceUrl: true });

      // if (user.user.displayName.match(/admin/) ) {
      // if (user.user.displayName == 'Admin123') {
      // this.router.navigateByUrl('/control', { replaceUrl: true });
      // } else {
      // this.router.navigateByUrl('/', { replaceUrl: true });
      // }
 
    }, async err => {
      await loading.dismiss();
 
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      await alert.present();
    });
  }

}
 