import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalProductPage } from 'src/app/modal-product/modal-product.page';
import { productData, ProductService } from 'src/app/services/product.service';

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
          type: 'text'
        },
        {
          name: 'productCategory',
          placeholder: 'Product Category',
          type: 'text'
        },
        {
          name: 'productPrice',
          placeholder: 'Product Price',
          type: 'text'
        },
        {
          name: 'productImage',
          placeholder: 'Product Image',
          type: 'text'
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
              productPrice: res.productPrice,
              productImage: res.productImage
            });
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


