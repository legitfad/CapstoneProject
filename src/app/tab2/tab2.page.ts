import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AdvertUI, DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  adverts: AdvertUI [] = [];

  constructor(
    private data: DataService, 
    private cd: ChangeDetectorRef,
    private alerts: AlertController, 
    private modal: ModalController, 
    private router: Router,
    private authService: AuthService
  ) { 
      this.data.getAds().subscribe(res => {console.log(res);
      this.adverts = res;
     }
    )
  }

  toChat() {
    this.router.navigateByUrl('/overview', { replaceUrl: true });
  }

  logout() {
    this.authService.logout();
  }
 

}
