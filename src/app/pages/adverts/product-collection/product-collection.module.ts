import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCollectionPageRoutingModule } from './product-collection-routing.module';

import { ProductCollectionPage } from './product-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCollectionPageRoutingModule
  ],
  declarations: [ProductCollectionPage]
})
export class ProductCollectionPageModule {}
