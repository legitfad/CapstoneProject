import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { AdvertUI, DataService } from '../services/data.service';

@Component({
  selector: 'app-add-advert-page',
  templateUrl: './add-advert-page.page.html',
  styleUrls: ['./add-advert-page.page.scss'],
})
export class AddAdvertPagePage implements OnInit {

  advert: AdvertUI = {
    title: '',
    image: '', 
  };

  capturedImage = null;

  constructor(private dataService: DataService, 
    private loadingController: LoadingController, 
    private router: Router) { }

  ngOnInit() {
  }

  async addImage() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });
    console.log('result: ', image);
    this.capturedImage = `data:image/jpeg;base64,${image.base64String}`;
    this.advert.image = image.base64String;
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.dataService.addAds(this.advert).then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/advertiser-page');
    });
  }
  
  

}
