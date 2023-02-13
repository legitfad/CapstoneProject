import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { cartData, CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-add-cart-page',
  templateUrl: './add-cart-page.page.html',
  styleUrls: ['./add-cart-page.page.scss'],
})
export class AddCartPagePage implements OnInit {

  cart: cartData ={
  id: '',
  productName: '',
  productPrice: '',
  Quantity: '',
  owner: '',
  email: '',
  uid: '',
  }

  constructor(private cartservice: CartService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.cartservice.addFileAdv(this.cart).then(() => {
      loading.dismiss();
      this.router.navigateByUrl('/tabs/cart-page');
    });
  }

}
