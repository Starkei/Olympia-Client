import { Component, OnInit, OnDestroy } from "@angular/core";
import { marker } from "src/app/interfaces/location";
import { Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"]
})
export class GoogleMapComponent implements OnInit {
  latitude: number;
  //  = 53.9;
  longitude: number;
  //  = 27.5667;
  zoom: number = 15;

  private itemsCollection: AngularFirestoreCollection<marker>;
  items: Observable<marker[]>;
  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<marker>("location");
    this.items = this.itemsCollection.valueChanges();
  }
  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
