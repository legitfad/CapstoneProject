import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  constructor(private firestore: Firestore) { }

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
}
