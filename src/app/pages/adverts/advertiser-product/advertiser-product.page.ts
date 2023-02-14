import { Component, Input, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertProdUI, AdvProdService } from 'src/app/services/adv-prod.service';
import { AdvertUI, DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-advertiser-product',
  templateUrl: './advertiser-product.page.html',
  styleUrls: ['./advertiser-product.page.scss'],
})
export class AdvertiserProductPage implements OnInit {
  @Input() id: any;
  products: AdvertProdUI [] = [];
  advertise: AdvertUI = null;
  advertId = null;

  selected: AdvertProdUI = null;

  constructor(
    private advSvc: AdvProdService,
    private firestore: Firestore,
    private data: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
  
  }


  ngOnInit() {

    this.advertId = this.route.snapshot.paramMap.get('advertid')
    this.advSvc.getAdsInfo(this.advertId)
    console.log("AdvertID: " + this.advertId)
    this.advSvc.getAdsById(this.advertId).subscribe(res => {console.log("Advert Dtl: " + res)
      this.advertise = res
    })

    this.advSvc.getProds().subscribe(res => {console.log(res); 
      this.products = res.filter(product => product.brand === this.advertise.brand)
      
    })
    
  }

}
