import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { productData, ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})

export class ProductPagePage implements OnInit {

  products: productData[] = [];


  constructor(private ProductService: ProductService, private alertCtrl: AlertController) {
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

  ngOnInit() {
  }

}
