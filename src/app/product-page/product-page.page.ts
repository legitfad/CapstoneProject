import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.page.html',
  styleUrls: ['./product-page.page.scss'],
})
export class ProductPagePage implements OnInit {


  constructor(private ProductService: ProductService) {
    this.ProductService.getProduct().subscribe(res => {console.log(res);
      }
    )
   }

  ngOnInit() {
  }

}
