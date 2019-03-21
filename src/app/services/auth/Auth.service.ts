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
import { switchMap } from "rxjs/operators";
import { User } from "src/app/interfaces/auth";
import * as firebase from "firebase/app";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<User>;

  private itemsCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.itemsCollection = afs.collection<User>("users");
    // this.user = this.itemsCollection.valueChanges();
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
  // addItem(item: User) {
  //   this.itemsCollection.add(item);
  // }
  addItem(dateBirth: Date, phone: number, sex: string, displayName: string) {
    //
    // Persist a document id
    var user = firebase.auth().currentUser;
    // const id = user.uid;
    // console.log(id);
    const users: User = {
      dateBirth,
      phone,
      sex,
      email: user.email,
      photoURL: user.photoURL,
      displayName
    };
    console.log(user.uid);
    this.itemsCollection.doc<User>(user.uid).set(users);
    // this.itemsCollection.add({ phone: 12335443 });
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

  // Login(): Promise<void> {
  //   const provider = new auth.EmailAuthProvider();
  //   return this.oAuthLogin(provider);
  // }
  private AuthLogin(value: any): Promise<void> {
    return this.afAuth.auth
      .signInWithEmailAndPassword(value, value)
      .then(credential => {
        this.updateUserData(credential.user);
      });
  }
  private oAuthLogin(provider: any): Promise<void> {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserData(credential.user);
    });
  }

  // AuthLogin(value: any): Promise<void> {
  //   return this.afAuth.auth
  //     .signInWithEmailAndPassword(value.email, value.passwor)
  //     .then(credential => {
  //       this.updateUserData(credential.user);
  //     });
  // }

  InfoAboutCurrentUser(): void {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, age, dateBirth, sex, phone;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
      console.log(user);
      console.log(email);
      console.log(uid);
      console.log(photoUrl);
      // age: user.age;
      // dateBirth = user.da;
      // sex = user.sex;
      // phone = user.phone;
    }
  }

  // infoUser(): void {
  //   var user = firebase.auth().currentUser;

  //   if (user != null) {
  //     user.providerData.forEach(function(profile) {
  //       console.log("Sign-in provider: " + profile.providerId);
  //       console.log("  UID: " + profile.uid);
  //       console.log("  Name: " + profile.displayName);
  //       console.log("  Email: " + profile.email);
  //       console.log("  Photo URL: " + profile.photoURL);
  //     });
  //   }
  // }

  // writeUserData(value) {
  //   var database = firebase.database();
  //   var userId = firebase.auth().currentUser.uid;
  //   firebase
  //     .database()
  //     .ref("users/" + userId)
  //     .set({
  //       age: value.age,
  //       dateBirth: value.dateBirth,
  //       // sex: value.sex,
  //       phone: value.phone
  //     });
  // }

  private updateUserData(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,

      dateBirth: user.dateBirth,
      sex: user.sex,
      phone: user.phone
    };

    return userRef.set(data, { merge: true });
  }

  doRegister(value: any): Promise<void> {
    const provider = new auth.EmailAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          credential => {
            // resolve(res);
            this.updateUserData(credential.user);
          },
          err => reject(err)
        );
      this.AuthLogin(provider);
    });
  }

  login(value: any): Promise<void> {
    const provider = new auth.EmailAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          // res => {
          //   resolve(this.router.navigate(["/area"]));
          // },
          credential => {
            this.updateUserData(credential.user);
          },
          err => reject(err)
        ),
        this.oAuthLogin(provider);
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }
}
