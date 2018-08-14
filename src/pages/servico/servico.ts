import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UsuarioDTO } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-servico',
  templateUrl: 'servico.html',
})

export class ServicoPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  ativo: boolean = true;

  users: UsuarioDTO[];

  searchQuery: string = '';
  items: string[];
  
  event: any = {
    month: '01-06-2018',
    timeStarts: '07:00',
    timeFinish: '07:00'
  }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    private alertCtrl: AlertController) {
      this.initializeItems();
  }

  ionViewDidLoad() {
    this.usuarioService.findAll()
      .subscribe(response => {
        this.users = response;
      },
        error => { });
  }

  addService() {
    let alert = this.alertCtrl.create(
      {
        title: 'Escalar Para Serviço',
        message: 'Deseja continuar?',
        buttons: [
          {
            text: "Cancelar",
            role: 'cancel',
            handler: () => {
              console.log('Escalamento cancelado');
            }
          },
          {
            text: 'Escalar',
            handler: () => {
              console.log('Escalamento realizado com sucesso!')
            }
          }
        ]
      }
    );

    alert.present();
  }

  initializeItems() {
    //this.users = [
    //  this.usuarioService.findByNome(this.users)
    //];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
  
  //addService(usuario_id : string) {
  //  this.navCtrl.push('EscalaPage', {usuario_id: usuario_id});    
  //}
//}
