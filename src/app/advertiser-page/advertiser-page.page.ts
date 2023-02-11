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

 


}
