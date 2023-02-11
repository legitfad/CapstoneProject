import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface productData {
  id?: string;
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: string;
}

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private firestore: Firestore) { }

  getProduct(): Observable<productData[]> {
    const productsRef = collection(this.firestore, 'product'); //'product' calling database name (Collection)
    return collectionData(productsRef, { idField: 'id'}) as Observable<productData[]>; //idfeild = product database id
  }

  getProductById(id: any): Observable<productData> {
    const productsRef = doc(this.firestore, `product/${id}`); //doc is calling for a single document
    return docData(productsRef, { idField: 'id' }) as Observable<productData>;
  }

  addProduct(product: productData) {
    const productsRef = collection(this.firestore, 'product');
    return addDoc(productsRef, product);
  }

  deleteProduct(product: productData) {
    const productsRef = doc(this.firestore, `product/${product.id}`);
    return deleteDoc(productsRef);
  }

  updateProduct(product: productData) {
    const productsRef = doc(this.firestore, `product/${product.id}`);
    return updateDoc(productsRef, { productName: product.productName, productDescription: product.productDescription }); //updating the info in your database 
  }
}
