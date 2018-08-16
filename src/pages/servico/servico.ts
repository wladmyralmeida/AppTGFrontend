import { UsuarioService } from './../../services/domain/usuario.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Searchbar } from 'ionic-angular';
import { UsuarioDTO } from '../../models/usuario.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-servico',
  templateUrl: 'servico.html',
})

export class ServicoPage {
  @ViewChild('searchbar', { read: ElementRef }) searchbarRef: ElementRef;
  @ViewChild('searchbar') searchbarElement: Searchbar;
  search: boolean = false;

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  users: UsuarioDTO[];

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
  }

  ionViewDidLoad() {
    //this.usuarioService.findAll()
      //.subscribe(response => {
      //  this.users = response;
      //},
      //  error => { });
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

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
      this.searchbarElement.setFocus();
    }
  }

  searchAction(texto: any) {
    let val = texto.target.value;
    this.usuarioService.findByNome(val.concat)
      .subscribe(response => {
        this.users = this.users.concat(response['content']);
      },
        error => { });
    console.log('buscando');
  }
}

  //addService(usuario_id : string) {
  //  this.navCtrl.push('EscalaPage', {usuario_id: usuario_id});    
  //}
//}
