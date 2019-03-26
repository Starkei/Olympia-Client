import { Injectable } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
import { DataQueryService } from "../engine/data-query-service/data-query.service";
@Injectable({
  providedIn: "root"
})
export class AuthService extends DataQueryService {
  user: Observable<User>;
  private itemsCollection: AngularFirestoreCollection<User>;
  constructor(private afAuth: AngularFireAuth, afs: AngularFirestore, private router: Router) {
    super(afs, "users");
    this.itemsCollection = afs.collection<User>("users");
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  infoAboutCurrentUser(): Observable<User> {
    let user = firebase.auth().currentUser;
    if (!user) return of(null);
    console.log(user);
    const userRef = this.itemsCollection
      .doc<User>(user.uid)
      .snapshotChanges()
      .pipe(
        map(actions => {
          let data: User = actions.payload.data() as User;
          data.uid = actions.payload.id;
          return data;
        })
      );
    return userRef;
  }

  addItem(dateBirth: Date, phone: number, sex: string, displayName: string, role: string) {
    dateBirth = new Date(dateBirth);
    let user = firebase.auth().currentUser;
    const users: User = {
      dateBirth,
      phone,
      sex,
      email: user.email,
      photoURL: user.photoURL,
      displayName,
      role
    };
    console.log(user.uid);
    this.itemsCollection.doc<User>(user.uid).set(users);
  }

  addItemLegalUser(nameOrg: string, phone: number, activityOrg: string, adresOrg: string, role: string) {
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    const users: User = {
      nameOrg,
      phone,
      activityOrg,
      email: user.email,
      photoURL: user.photoURL,
      adresOrg,
      role
    };
    console.log(user.uid);
    this.itemsCollection.doc<User>(user.uid).set(users);
  }

  googleLogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  facebookLogin(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }
  twitterLogin(): Promise<void> {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }
  // private AuthLogin(provider: any): Promise<void> {
  //   return this.afAuth.auth
  //     .signInWithEmailAndPassword(provider, provider)
  //     .then(credential => {
  //       this.updateUserData(credential.user);
  //     });
  // }

  private updateUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      // dateBirth: user.dateBirth,
      // sex: user.sex,
      phone: user.phone,
      role: user.role
    };

    return userRef.set(data, { merge: true });
  }

  doRegister(value: any): Promise<void> {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          credential => {
            resolve(credential);
            this.updateUserData(credential.user);
          },
          err => reject(err)
        );
    });
  }

  login(value: any): Promise<void> {
    // const provider = new auth.EmailAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(this.router.navigate(["/area"]));
            resolve(res);
            this.updateUserData(res.user);
          },

          err => reject(err)
        );
      // this.AuthLogin(provider);
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
