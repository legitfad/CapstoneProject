import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { cartData, CartService } from 'src/app/services/cart.service';
import { ModalCartPage } from 'src/app/modals/modal-cart/modal-cart.page';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
})
export class CartPagePage implements OnInit {

  carts: cartData [] = [];
  filterCart: cartData[];

  constructor(private cart: CartService, private cd: ChangeDetectorRef, private alerts: AlertController, private modal: ModalController,private toastCtrl: ToastController,private db: AngularFirestore,) { 
    this.cart.getCart().subscribe(res => {console.log(res);
      this.carts = res.filter(cart => cart.email === this.cart.currentUser.email)
     }
    )
  }

  filterData() {
    this.filterCart = this.carts.filter(cart => cart.email === this.cart.currentUser.email);  
  }


  ngOnInit() {
    
  }

  async openCart(cart: cartData) {
    const modal = await this.modal.create({
      component: ModalCartPage,
      componentProps: { id: cart.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

}
