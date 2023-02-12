import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AdvDetailPage } from 'src/app/modals/adv-detail/adv-detail.page';
import { AdvertUI, DataService } from '../../../services/data.service';

@Component({
  selector: 'app-advertiser-page',
  templateUrl: './advertiser-page.page.html',
  styleUrls: ['./advertiser-page.page.scss'],
})
export class AdvertiserPagePage implements OnInit {

  adverts: AdvertUI [] = [];

  constructor(
    private data: DataService, 
    private cd: ChangeDetectorRef,
    private alerts: AlertController, 
    private modal: ModalController,
    private toastCtrl: ToastController,
    private db: AngularFirestore,
  ) { 
      this.data.getAds().subscribe(res => {console.log(res);
      this.adverts = res;
      
     }
    )
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

 
 


}
