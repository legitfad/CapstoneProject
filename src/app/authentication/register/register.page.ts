import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
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
      name: ['Name', [Validators.required]],
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

}
