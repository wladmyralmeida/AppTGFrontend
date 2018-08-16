import { Geolocation } from '@ionic-native/geolocation';
import { filter } from 'rxjs/operators';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController } from 'ionic-angular';
import { Subscription } from '../../../node_modules/rxjs';
import { Storage } from  '@ionic/storage';
//import { AlertController } from '../../../node_modules/ionic-angular/components/alert/alert-controller';

declare var google;

@IonicPage()
@Component({
  selector: 'page-desempenho',
  templateUrl: 'desempenho.html',
})
export class DesempenhoPage {

  @ViewChild('map') mapElement: ElementRef;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  map: any;

  postionSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private geolocation: Geolocation,
    private storage: Storage
  ) {

  }

  ionViewDidLoad() {
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(15);
      });
    });
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.postionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter(p => p.coords !== undefined
        ))
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        });
      })
  }


  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.lenght > 1) {
      this.currentMapTrack = new google.maps.PolyLine({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.postionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }
}