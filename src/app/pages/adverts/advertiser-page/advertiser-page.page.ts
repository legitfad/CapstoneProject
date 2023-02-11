import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AdvertUI, DataService } from '../../../services/data.service';

@Component({
  selector: 'app-advertiser-page',
  templateUrl: './advertiser-page.page.html',
  styleUrls: ['./advertiser-page.page.scss'],
})
export class AdvertiserPagePage implements OnInit {
  @Input() id: any;
  adverts: AdvertUI [] = [];
  advert: AdvertUI = null;
  constructor(
    private data: DataService, 
    private cd: ChangeDetectorRef,
    private alerts: AlertController, 
    private modal: ModalController,
    private toastCtrl: ToastController
  ) { 
      this.data.getAds().subscribe(res => {console.log(res);
      this.adverts = res;
      
     }
    )
  }

  ngOnInit() {
  }

  async deleteAdv() {
    await this.data.deleteAdvert(this.advert)
    
    const toast = await this.toastCtrl.create({
      message: 'Ad Deleted!.',
      duration: 100
    });
    toast.present();
  }


 


}
