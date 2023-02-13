import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs';
import { productData, ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})

export class ProductPagePage implements OnInit {

  public productlist: any;
  products: productData[] = [];
  productbanners: any[] = [];
  filteredproducts: productData[];
  isLoading: boolean = false;

  constructor(private ProductService: ProductService, private alertCtrl: AlertController, private firestore: AngularFirestore) {
    this.ProductService.getProduct().subscribe(res => {
      console.log(res);
      this.products = res;
      }
    )
   }

   filterData(productCategory: string) {
    this.filteredproducts = this.products.filter(product => product.productCategory === productCategory);
}

   getBanners() {
    this.ProductService.getBanners().then(data => {
      console.log(data);
      this.productbanners = data;
    })
    .catch(e => {
      console.log(e);
    })
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

  ngOnInit() {
    this.getBanners();
  }

}
