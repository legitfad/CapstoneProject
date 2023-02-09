import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AdvertUI, DataService } from '../services/data.service';

@Component({
  selector: 'app-advertiser-page',
  templateUrl: './advertiser-page.page.html',
  styleUrls: ['./advertiser-page.page.scss'],
})
export class AdvertiserPagePage implements OnInit {

  adverts: AdvertUI [] = [];

  constructor(private data: DataService, private cd: ChangeDetectorRef,
    private alerts: AlertController, private modal: ModalController) { 
      this.data.getAds().subscribe(res => {console.log(res);
      this.adverts = res;
     }
    )
  }

  ngOnInit() {
  }

  async addAds() {
    const alert = await this.alerts.create({
      header: 'Add Campaign',
      inputs: [
        {
          name: 'title',
          placeholder: 'Campaign Name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Submit',
          handler: res => {
            this.data.addAds({
              title: res.title
            })
          }
        }
      ]
    });
    await alert.present()
  }


}
