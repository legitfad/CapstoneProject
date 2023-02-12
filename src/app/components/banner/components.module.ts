
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { BannerComponent } from './banner.component';



@NgModule({
  declarations: [
    BannerComponent,
   
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BannerComponent
    
  ],
  // only those components not defined in template
  entryComponents: [
    BannerComponent
    
  ]
})
export class ComponentsModule { }