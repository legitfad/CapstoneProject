import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { productData, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-modal-addproduct',
  templateUrl: './modal-addproduct.page.html',
  styleUrls: ['./modal-addproduct.page.scss'],
})
export class ModalAddproductPage implements OnInit {

  addproductform: FormGroup;
  submitted: boolean = false;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({positiveNumber: true});
    } else {
      return (null);
    }
  }

  constructor(private modalController: ModalController, private productservice: ProductService) {
    this.addproductform = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
   });
  }

  add(){
    this.submitted = true;
    
    if(this.addproductform.valid){
      this.productservice.addProduct({
        productName: this.addproductform.value.name,
        productDescription: this.addproductform.value.description,
        productCategory: this.addproductform.value.category,
        productPrice: this.addproductform.value.price,
        productImage: this.addproductform.value.image,

    });
    this.modalController.dismiss();
    }
  }

  dismiss(){
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
