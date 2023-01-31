import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService  {

  constructor(private readonly firestore: Firestore) {}

  addReward(
    rewardName: string,
    rewardCost: string,
    rewardDate: string,
    rewardDescription: string,
    rewardCatergory: string
  ): Promise<void> {
    return addDoc(collection(this.firestore, "reward"), {
    rewardName,
    rewardCost,
    rewardDate,
    rewardDescription,
    rewardCatergory,
   })
}

}
function addDoc(arg0: CollectionReference<DocumentData>, arg1: { rewardName: string; rewardCost: string; rewardDate: string; rewardDescription: string; rewardCatergory: string; }): Promise<void> {
  throw new Error('Function not implemented.');
}

