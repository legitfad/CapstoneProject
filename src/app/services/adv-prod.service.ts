import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, doc, docData, Firestore, serverTimestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';

export interface AdvertProdUI {
  id?: string;
  name: string;
  file: string;
  desc: string;
  brand: string;
  owner: string;
  email: string;
  uid: string;
} 

export interface AdvertUI {
  id?: string;
  brand: string;
  title: string;
  file: string;
  desc: string;
  startDate: string;
  endDate: string;
  owner: string;
  email: string;
  uid: string;
} 

@Injectable({
  providedIn: 'root'
})
export class AdvProdService {

  logout$: Subject<boolean> = new Subject<boolean>();
  
  constructor(
    private firestore: Firestore, 
    private storage: Storage, 
    private auth: AuthService, 
    private afs: AngularFirestore,
    private firebaseAuth: Auth
  ) { 
    onAuthStateChanged(this.firebaseAuth, user => {
      if (!user) {
        this.logout$.next(true);
      }
    })
  }

async addFileAdv(advertProd: AdvertProdUI) {
    const userId = this.auth.getUserId();
    const displayName = this.auth.getUserName();
    const email = this.auth.getUserEmail();
    let newName = `${new Date().getTime()}-${userId}.jpeg`;

    const storageRef = ref(this.storage, newName);
    const uploadResult = await uploadString(storageRef, advertProd.file, 'base64', {
      contentType: 'image/jpeg'
    });

    const url = await getDownloadURL(uploadResult.ref);

    const messages = await addDoc(collection(this.firestore, 'prodAdvert'), {
      name: advertProd.name,
      uid: userId,
      owner: displayName,
      email: email,
      file: url,
      brand: advertProd.brand,
      desc: advertProd.desc,
      createdAt: serverTimestamp()
    });
    console.log('Document added: ', messages)
  
  }

  getProds(): Observable<AdvertProdUI[]> {
    const advDocRef = collection(this.firestore, 'prodAdvert');
    return collectionData(advDocRef, {idField: 'id'}) as Observable<AdvertProdUI[]>;
  }

  getProdsByBrand(brand: string): Observable<AdvertProdUI[]> {
    const advDocRef = this.afs.collection<AdvertProdUI>('prodAdvert', ref => ref.where('brand', '==', brand));
    return advDocRef.valueChanges();
  }
  getAdsById(id: any): Observable<AdvertUI> {
    const advDocRef = doc(this.firestore, `advert/${id}`);
    return docData(advDocRef, { idField: 'id' }) as Observable<AdvertUI>;
  }

  getAdsInfo(advertId) {
    const advert = doc(this.firestore, `advert/${advertId}`);
    return docData(advert).pipe (
      takeUntil(this.logout$)
    )
  }
  
}
