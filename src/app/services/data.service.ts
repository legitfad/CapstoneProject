import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface AdvertUI {
  id?: string;
  title: string;

}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

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


}
