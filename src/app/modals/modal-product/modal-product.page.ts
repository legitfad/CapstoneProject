import { Component, OnInit , Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { productData, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.page.html',
  styleUrls: ['./modal-product.page.scss'],
})
export class ModalProductPage implements OnInit {

  @Input() id: any;
  product: productData = null;

  constructor(private dataService: ProductService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.dataService.getProductById(this.id).subscribe(res => {
      this.product = res;
    });
  }
 
  async updateProduct() {
    await this.dataService.updateProduct(this.product);
    this.modalCtrl.dismiss()

    const toast = await this.toastCtrl.create({
      message: 'Product Updated!.',
      duration: 100
    });
    toast.present();
  }

  async deleteProduct() {
    await this.dataService.deleteProduct(this.product)
    this.modalCtrl.dismiss();

    const toast = await this.toastCtrl.create({
      message: 'Product Deleted!.',
      duration: 100
    });
    toast.present();

  }

}
