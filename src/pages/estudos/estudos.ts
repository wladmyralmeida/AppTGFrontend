import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-estudos',
  templateUrl: 'estudos.html'
})

export class EstudosPage {
  constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }
}
