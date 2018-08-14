import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-escala',
  templateUrl: 'escala.html',
})
export class EscalaPage {

  latitude : number;
  longitude : number;
  constructor(private geolocation : Geolocation) {
  }

  ionViewDidLoad() {
    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  

}
