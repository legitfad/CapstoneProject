import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { IonDatetime } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface rewardUi {
  id?: string;
  rewardName: string;
  rewardCost: number;
  rewardImage: String;
  rewardDetail: string;
  rewardCategory: string;
}


@Injectable({
  providedIn: 'root'
})

export class RewardService {

  constructor(private firestore: Firestore) {}

  getRewards(): Observable<rewardUi[]> {
    const RewardDocRef = collection(this.firestore, 'reward');
    return collectionData(RewardDocRef, {idField: 'id'}) as Observable<rewardUi[]>;
  }
  getRewardById(id: any): Observable<rewardUi> {
    const RewardDocRef = doc(this.firestore, `reward/${id}`);
    return docData(RewardDocRef, { idField: 'id' }) as Observable<rewardUi>;
  }

  addReward(Reward: rewardUi) {
    const RewardsRef = collection(this.firestore, 'reward');
    return addDoc(RewardsRef, Reward);
  }

  deleteReward(Reward: rewardUi) {
    const RewardDocRef = doc(this.firestore, `reward/${Reward.id}`);
    return deleteDoc(RewardDocRef);
  }

  updateReward(Reward: rewardUi) {
    const RewardDocRef = doc(this.firestore, `reward/${Reward.id}`);
    return updateDoc(RewardDocRef, 
      { 
      rewardName: Reward.rewardName, 
      rewardCost: Reward.rewardCost , 
      rewardImage: Reward.rewardImage, 
      rewardDetail: Reward.rewardDetail, 
      rewardCategory: Reward.rewardCategory });
  }

}

