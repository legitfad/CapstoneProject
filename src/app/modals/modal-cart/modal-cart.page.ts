import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { cartData, CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal-cart',
  templateUrl: './modal-cart.page.html',
  styleUrls: ['./modal-cart.page.scss'],
})
export class ModalCartPage implements OnInit {

  @Input() id: any;
  cart: cartData = null;

  constructor(   private cartservice: CartService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  async deleteCart() {
    await this.cartservice.deleteCart(this.cart)
    this.modalCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Cart Deleted!.',
      duration: 50
    });
    toast.present();
  }

  async updateCart() {
    await this.cartservice.updateCart(this.cart);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Cart updated!.',
      duration: 50
    });
    
    toast.present();

  }

  ngOnInit() {
    this.cartservice.getCartById(this.id).subscribe(res => {
      this.cart = res;
    });
  }

}
