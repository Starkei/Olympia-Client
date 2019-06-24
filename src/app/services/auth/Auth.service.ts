import { Injectable } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
import { DataQueryService } from "src/app/engine/classes/data-query-service/data-query.service";
@Injectable({
  providedIn: "root"
})
export class AuthService extends DataQueryService {
  user: Observable<User>;
  private itemsCollection: AngularFirestoreCollection<User>;
  constructor(
    private afAuth: AngularFireAuth,
    afs: AngularFirestore,
    private router: Router
  ) {
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

  addUserData(
    dateBirth: Date,
    phone: number,
    sex: string,
    displayName: string,
    role: string,
    photoURL: string
  ) {
    dateBirth = new Date(dateBirth);
    let user = firebase.auth().currentUser;
    const users: User = {
      dateBirth,
      phone,
      sex,
      email: user.email,
      photoURL,
      displayName,
      role
    };
    this.itemsCollection.doc<User>(user.uid).set(users);
    this.router.navigate(["/main"]);
  }

  addLegalUser(
    nameOrg: string,
    phone: number,
    activityOrg: string,
    adresOrg: string,
    role: string
  ) {
    let user = firebase.auth().currentUser;
    const users: User = {
      nameOrg,
      phone,
      activityOrg,
      email: user.email,
      photoURL: user.photoURL,
      adresOrg,
      role
    };
    this.itemsCollection.doc<User>(user.uid).set(users);
    this.router.navigate(["/main"]);
  }

  googleLogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return new Promise<any>((resolve, reject) => {
      this.oAuthLogin(provider).then(
        credential => {
          resolve(this.router.navigate(["/main"]));
        },
        err => reject(err)
      );
    });
  }
  facebookLogin(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    return new Promise<any>((resolve, reject) => {
      this.oAuthLogin(provider).then(
        credential => {
          resolve(this.router.navigate(["/main"]));
        },
        err => reject(err)
      );
    });
  }

  private oAuthLogin(provider: any): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  private updateUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
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
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(this.router.navigate(["/main"]));
            resolve(res);
            this.updateUserData(res.user);
          },

          err => reject(err)
        );
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
