import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface product {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: Firestore) { }

  getProduct(): Observable<product[]> {
    const notesRef = collection(this.firestore, 'product');
    return collectionData(notesRef, { idField: 'id'}) as Observable<product[]>;
  }

  getProductById(id: any): Observable<product> {
    const noteDocRef = doc(this.firestore, `product/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<product>;
  }

  addProduct(product: product) {
    const notesRef = collection(this.firestore, 'product');
    return addDoc(notesRef, product);
  }

  deleteProduct(product: product) {
    const noteDocRef = doc(this.firestore, `product/${product.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(product: product) {
    const noteDocRef = doc(this.firestore, `product/${product.id}`);
    return updateDoc(noteDocRef, { title: product.title, text: product.text });
  }

}
