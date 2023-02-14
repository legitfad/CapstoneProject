import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AdvDetailPage } from 'src/app/modals/adv-detail/adv-detail.page';
import { AuthService } from 'src/app/services/auth.service';
import { AdvertUI, DataService } from '../../../services/data.service';

@Component({
  selector: 'app-advertiser-page',
  templateUrl: './advertiser-page.page.html',
  styleUrls: ['./advertiser-page.page.scss'],
})
export class AdvertiserPagePage implements OnInit {

  adverts: AdvertUI [] = [];
  filterAdv: AdvertUI[];

  constructor(
    private data: DataService, 
    private modal: ModalController,
    private authService: AuthService,
  ) { 
      this.data.getAds().subscribe(res => {console.log(res);
      this.adverts = res.filter(advert => advert.email === this.data.currentUser.email)
      
     }
    )
  }
 
  filterData() {
    this.filterAdv = this.adverts.filter(advert => advert.email === this.data.currentUser.email);  
  }

  ngOnInit() {
  }

  async openAd(advert: AdvertUI) {
    const modal = await this.modal.create({
      component: AdvDetailPage,
      componentProps: { id: advert.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  logout() {
    this.authService.logout();
  }
 
}
