import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc, serverTimestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';
import { Advert } from 'src/model/advert';

import { from, Observable } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

export interface AdvertUI {
  id?: string;
  title: string;
  image: string;
}

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: User = null;
  allAdverts: Advert[] = [];

  constructor(
    private afs: AngularFirestore, 
    private afstorage: AngularFireStorage, 
    private afAuth: AngularFireAuth,
  private firestore: Firestore, 
  private storage: Storage, 
  private auth: AuthService ) { 
    this.afAuth.onAuthStateChanged(user => {
      console.log('User change: ', user);
      this.currentUser = user
    })
  }

  getAds(): Observable<AdvertUI[]> {
    const advDocRef = collection(this.firestore, 'advert');
    return collectionData(advDocRef, {idField: 'id'}) as Observable<AdvertUI[]>;
  }

  addAds(Advert: AdvertUI) {
    const advRef = collection(this.firestore, 'advert');
    return addDoc(advRef, Advert);
  }

  updateAd(Advert: AdvertUI) {
    const AdDocRef = doc(this.firestore, `advert/${Advert.id}`);
    return updateDoc(AdDocRef, 
      { title: Advert.title });
  }

  async addFileMsg(base64) {
    const userId = this.auth.getUserId();
    let newName = `${new Date().getTime()}-${userId}.jpeg`;

    const storageRef = ref(this.storage, newName);
    const uploadResult = await uploadString(storageRef, base64, 'base64', {
      contentType: 'image/jpeg'
    });

    const url = await getDownloadURL(uploadResult.ref);

    const messages = collection(this.firestore, `post`);
    return addDoc(messages, {
      from: userId,
      file: url,
      createdAt: serverTimestamp()
    });
  }

  addAdvert(advert: AdvertUI) {
    let newName = `${new Date().getTime()}-DUMMY.png`;
    let storageRef: AngularFireStorageReference = this.afstorage.ref(`/advert/${newName}`);
    const storageObs = from(storageRef.putString(advert.image, 'base64', {contentType: 'image/png'}));

    return storageObs.pipe(
      switchMap(obj => {
        return obj.ref.getDownloadURL();
      }),
      switchMap(url => {
        console.log('my url: ', url);
        return this.afs.collection('advert').add({
          title: advert.title,
          creator: this.currentUser.uid,
          image: url
        });
      })
    )
  }

 
}
