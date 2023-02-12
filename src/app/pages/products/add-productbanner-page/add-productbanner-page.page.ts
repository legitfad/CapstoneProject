import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-productbanner-page',
  templateUrl: './add-productbanner-page.page.html',
  styleUrls: ['./add-productbanner-page.page.scss'],
})
export class AddProductbannerPagePage implements OnInit {

  productBannerImange: any;

  constructor(public firestorage: AngularFireStorage, public productservice: ProductService, public global: GlobalService) { }

  preview(event) {
    console.log(event);
    const files = event.target.files;
    if(files.length == 0) return;
    const mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null) return;
    const file = files[0];
    const filePath = 'productBanners/' + Date.now() + '_' + file.name;
    const fileRef = this.firestorage.ref(filePath);
    const task = this.firestorage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadUrl = fileRef.getDownloadURL();
        downloadUrl.subscribe(url => {
          console.log('url: ', url);
          if(url) {
            this.productBannerImange = url;
          }
        })
      })
    )
    .subscribe(url => {
      console.log('data: ', url);
    });
  }

  async saveBanner() {
    try {
      if(this.productBannerImange == '' || !this.productBannerImange) return;
      this.global.showLoader();
      const data = {
        banner: this.productBannerImange,
        status: 'active'
      };
      await this.productservice.addBanner(data);
      this.global.hideLoader();
      this.global.successToast('Banner Created!');
    } catch(e) {
      this.global.errorToast();
    }
  }

  ngOnInit() {
  }

}
