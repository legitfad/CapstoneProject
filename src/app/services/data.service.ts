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

export interface AdvertUI {
  id?: string;
  title: string;
  file: string;
  desc: string;
  startDate: string;
  endDate: string;
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
  // allAdverts: Advert[] = [];
  adverts: Observable<any[]>;

  constructor(
    private afs: AngularFirestore, 
    private afstorage: AngularFireStorage, 
    private afAuth: AngularFireAuth,
    private firestore: Firestore, 
    private storage: Storage, 
    private auth: AuthService, 
  ) { 
    this.afAuth.onAuthStateChanged(user => {
      console.log('User change: ', user);
      this.currentUser = user
    })
  }

  getAds(): Observable<AdvertUI[]> {
    const advDocRef = collection(this.firestore, 'advert');
    return collectionData(advDocRef, {idField: 'id'}) as Observable<AdvertUI[]>;
  }

  getAdsByOwner() {
  return this.afs.collection('advert', ref => ref.where('email', '==', this.currentUser.email))
  }


  getAdsById(id: any): Observable<AdvertUI> {
    const advDocRef = doc(this.firestore, `advert/${id}`);
    return docData(advDocRef, { idField: 'id' }) as Observable<AdvertUI>;
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

  async addFileAdv(advert: AdvertUI) {
    const userId = this.auth.getUserId();
    const displayName = this.auth.getUserName();
    const email = this.auth.getUserEmail();
    let newName = `${new Date().getTime()}-${userId}.jpeg`;

    const storageRef = ref(this.storage, newName);
    const uploadResult = await uploadString(storageRef, advert.file, 'base64', {
      contentType: 'image/jpeg'
    });

    const url = await getDownloadURL(uploadResult.ref);

    const messages = await addDoc(collection(this.firestore, 'advert'), {
      title: advert.title,
      uid: userId,
      owner: displayName,
      email: email,
      file: url,
      desc: advert.desc,
      startDate: advert.startDate,
      endDate: advert.endDate,
      createdAt: serverTimestamp()
    });
    console.log('Document added: ', messages)
  
  }

  deleteAdv(Advert: AdvertUI) {
    const docRef = doc(this.firestore, `advert/${Advert.id}`);
    return deleteDoc(docRef);
  }


  // addAdvert(advert: AdvertUI) {
  //   let newName = `${new Date().getTime()}-DUMMY.jpg`;
  //   let storageRef: AngularFireStorageReference = this.afstorage.ref(`/advert/${newName}`);
  //   const storageObs = from(storageRef.putString(advert.image, 'base64', {contentType: 'image/png'}));

  //   return storageObs.pipe(
  //     switchMap(obj => {
  //       return obj.ref.getDownloadURL();
  //     }),
  //     switchMap(url => {
  //       console.log('my url: ', url);
  //       return this.afs.collection('advert').add({
  //         title: advert.title,
  //         image: url
  //       });
  //     })
  //   )
  // }
 
 
}
