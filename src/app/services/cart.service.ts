import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, serverTimestamp, query, where } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Advert } from 'src/model/advert';

import { from, Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { user } from '@angular/fire/auth';

export interface cartData {
  id?: string;
  productName: string;
  productPrice: string;
  Quantity: string;
  owner: string;
  email: string;
  uid: string;
}

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  currentUser: User = null;
  // allAdverts: Advert[] = [];
  cart: Observable<any[]>;

  constructor(private afs: AngularFirestore, private afstorage: AngularFireStorage, private afAuth: AngularFireAuth,private firestore: Firestore, private storage: Storage, private auth: AuthService,) 
    { 
      this.afAuth.onAuthStateChanged(user => {
        console.log('User change: ', user);
        this.currentUser = user
      })
    }

    getCart(): Observable<cartData[]> {
      const cartDocumentRef = collection(this.firestore, 'cart');
      return collectionData(cartDocumentRef, {idField: 'id'}) as Observable<cartData[]>;
    }
  
    getCartByOwner() {
    return this.afs.collection('cart', ref => ref.where('email', '==', this.currentUser.email))
    }
  
  
    getCartById(id: any): Observable<cartData> {
      const cartDocumentRef = doc(this.firestore, `cart/${id}`);
      return docData(cartDocumentRef, { idField: 'id' }) as Observable<cartData>;
    }
  
    addCart(cart: cartData) {
      const cartDocumentRef = collection(this.firestore, 'cart');
      return addDoc(cartDocumentRef, cart);
    }
   
    updateCart(cart: cartData) {
      const cartDocumentRef = doc(this.firestore, `cart/${cart.id}`);
      return updateDoc(cartDocumentRef, { 
        productName: cart.productName,
        productPrice: cart.productPrice, 
        quantity: cart.Quantity
      });
    }

    async addFileAdv(cart: cartData) {
      const userId = this.auth.getUserId();
      const displayName = this.auth.getUserName();
      const email = this.auth.getUserEmail();
  
      const messages = await addDoc(collection(this.firestore, 'cart'), {
        productName: cart.productName,
        productPrice: cart.productPrice,
        Quantity: cart.Quantity,
        uid: userId,
        owner: displayName,
        email: email,
        createdAt: serverTimestamp()
      });
      console.log('Cart Information added: ', messages)
    }

    deleteCart(cart: cartData) {
      const cartDocumentRef = doc(this.firestore, `cart/${cart.id}`);
      return deleteDoc(cartDocumentRef);
    }

}
