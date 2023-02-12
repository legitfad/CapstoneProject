import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from '@angular/fire/auth';
import { doc, docData, Firestore, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, Subject, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserData = null;
  logout$: Subject<boolean> = new Subject<boolean>();
  private user = null;

  constructor(
    private afAuth: AngularFireAuth, 
    private db: AngularFirestore, 
    private auth: Auth, 
    private firestore: Firestore, 
    private router: Router) {
      
    onAuthStateChanged(this.auth, user => {      
      if (user) {
        const userDoc = doc(this.firestore, `users/${user.uid}`);
        
        docData(userDoc, { idField: 'id' }).pipe(
          takeUntil(this.logout$)
        ).subscribe(data => {
          this.currentUserData = data;
        })
      } else {
        this.currentUserData = null;
      }
    })

    // this.user = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       return this.db.doc(`users/${user.uid}`).valueChanges();
    //     } else {
    //       return of(null);
    //     }
    //   })
    // )
    
   }

  login({email, password}) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup({ email, password, name }): Promise<UserCredential> {
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      updateProfile(this.auth.currentUser, {
        displayName: name
      })
      const userDoc = doc(this.firestore, `users/${credentials.user.uid}`);
      await setDoc(userDoc, { createdAt: serverTimestamp() ,email, name, chats: [] });
      return credentials;
    } catch(err) {
      throw(err);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.logout$.next(true);
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

  getUserId() {
    return this.auth.currentUser.uid;
  }

  getUserName() {
    return this.auth.currentUser.displayName;
  }

  getUserEmail() {
    return this.currentUserData.email;
  }
  
}
