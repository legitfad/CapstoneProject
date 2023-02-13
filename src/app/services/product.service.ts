import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';


export interface productData {
  id?: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: string;
  productImage: string;
}

@Injectable({
  providedIn: 'root' 
})


export class ProductService {

  products: Observable<any[]>; // Testing

  constructor(private firestore: Firestore, private adb: AngularFirestore) { }

  getProduct(): Observable<productData[]> {
    const productDocumentRef = collection(this.firestore, 'product'); //'product' calling database name (Collection)
    return collectionData(productDocumentRef, { idField: 'id'}) as Observable<productData[]>; //idfeild = product database id
  }

  getProductById(id: any): Observable<productData> {
    const productDocumentRef = doc(this.firestore, `product/${id}`); //doc is calling for a single document
    return docData(productDocumentRef, { idField: 'id' }) as Observable<productData>;
  }

  addProduct(product: productData) {
    const productDocumentRef = collection(this.firestore, 'product');
    return addDoc(productDocumentRef, product);
  }

  deleteProduct(product: productData) {
    const productDocumentRef = doc(this.firestore, `product/${product.id}`);
    return deleteDoc(productDocumentRef);
  }

  updateProduct(product: productData) {
    const productDocumentRef = doc(this.firestore, `product/${product.id}`);
    return updateDoc(productDocumentRef, { 
      productName: product.productName, 
      productDescription: product.productDescription, 
      productCategory: product.productCategory,
      productPrice: product.productPrice,
      productImage: product.productImage}); //updating the info in your database 
  }

  collection(path, queryFn?) {
    return this.adb.collection(path, queryFn);
  }

  randomString() {
    const id = Math.floor(100000000 + Math.random() * 900000000);
    return id.toString();
  }

  // banner apis
  async addBanner(data) {
    try {
      const id = this.randomString();
      data.id = id;
      await this.collection('productBanner').doc(id).set(data);
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  async getBanners() {
    try {
      const productbanners = await this.collection('productBanner').get().pipe(
        switchMap(async(data: any) => {
          let bannerData = await data.docs.map(element => {
            const item = element.data();
            return item;
          });
          console.log(bannerData);
          return bannerData;
        })
      ).toPromise();
      console.log(productbanners);
      return productbanners;
    } catch(e) {
      throw(e);
    }
  }
  
}
