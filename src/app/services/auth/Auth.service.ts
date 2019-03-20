import { Injectable } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
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

  Login(): Promise<void> {
    const provider = new auth.EmailAuthProvider();
    return this.oAuthLogin(provider);
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
          res => {
            resolve(res);
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
            resolve(this.router.navigate(["/area"]));
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
