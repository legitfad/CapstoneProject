import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { AdvertProdUI, AdvProdService } from 'src/app/services/adv-prod.service';

@Component({
  selector: 'app-add-advert-product',
  templateUrl: './add-advert-product.page.html',
  styleUrls: ['./add-advert-product.page.scss'],
})
export class AddAdvertProductPage implements OnInit {

  product: AdvertProdUI = {
    name: '',
    file: '', 
    desc: '',
    brand: '',
    owner: '',
    email: '',
    uid: '',
  };

  capturedImage = null;

  constructor(private dataService: AdvProdService, 
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
    this.product.file = image.base64String;
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.dataService.addFileAdv(this.product).then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/advertiser-page');
    });
  }
   

}
