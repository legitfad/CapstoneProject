import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { IonDatetime } from '@ionic/angular';
import { Observable } from 'rxjs';


export interface pointUI {
  id?: string;
  point: string;
  pointDate: IonDatetime;
  purpose: string;
  personalId: string;
  rewardId: string;
}

@Injectable({
  providedIn: 'root'
})

export class PointService {
  constructor(private firestore: Firestore) {}

    getPoints(): Observable<pointUI[]> {
      const PointDocRef = collection(this.firestore, 'points');
      return collectionData(PointDocRef, {idField: 'id'}) as Observable<pointUI[]>;
    }

    getPointById(id: any): Observable<pointUI> {
    const PointDocRef = doc(this.firestore, `points/${id}`);
    return docData(PointDocRef, { idField: 'id' }) as Observable<pointUI>;
  }
}