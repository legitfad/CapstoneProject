import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AdvertUI, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.page.html',
  styleUrls: ['./adv-detail.page.scss'],
})
export class AdvDetailPage implements OnInit {

  @Input() id: any;
  advert: AdvertUI = null;

   constructor(
    private dataService: DataService, 
    private modalCtrl: ModalController, 
    private toastCtrl: ToastController,
    private router: Router,
  ) { }

    ngOnInit() {
    this.dataService.getAdsById(this.id).subscribe(res => {
      this.advert = res;
    });
  }
  async deleteAdv() {
    await this.dataService.deleteAdv(this.advert)
    this.modalCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Campaign Deleted!.',
      duration: 50
    });
    toast.present();
  
  }

  async updateAdv() {
    await this.dataService.updateAd(this.advert);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Campaign updated!.',
      duration: 50
    });
    toast.present();

  }

  addProducts() {
    this.router.navigateByUrl('/add-advert-product');
    this.modalCtrl.dismiss();
  }

}
