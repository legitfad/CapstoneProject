import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { productData, ProductService } from '../services/product.service';
import { ModalProductPage } from '../modal-product/modal-product.page';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.page.html',
  styleUrls: ['./add-product-page.page.scss'],
})

export class AddProductPagePage implements OnInit {

  products: productData[] = [];

  constructor(private ProductService: ProductService, private alertCtrl: AlertController, private modalCtrl: ModalController) { 
    this.ProductService.getProduct().subscribe(res => {
      console.log(res);
      this.products = res;
      }
    )
  }

  async addProduct() {
    const alert = await this.alertCtrl.create({
      header: 'Add Product',
      inputs: [
        {
          name: 'productName',
          placeholder: 'Product Name',
          type: 'text'
        },
        {
          name: 'productDescription',
          placeholder: 'Product Description',
          type: 'textarea'
        },
        {
          name: 'Product Category',
          placeholder: 'Product Category',
          type: 'text'
        },
        {
          name: 'rewardPrice',
          placeholder: 'Product Price',
          type: 'textarea'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.ProductService.addProduct( { 
              productName: res.productName, 
              productDescription: res.productDescription, 
              productCategory: res.productCategory, 
              productPrice: res.productPrice });
                  }
        }
      ]
    });
      await alert.present();
  }

  async openProduct(product: productData) {
    const modal = await this.modalCtrl.create({
      component: ModalProductPage,
      componentProps: { id: product.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }


  ngOnInit() {}
  
}


