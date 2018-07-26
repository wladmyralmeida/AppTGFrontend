import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['wlad silva', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      numero : ['32', [Validators.required]],
      email: ['cursoscpdti@gmail.com', [Validators.required, Validators.email]],
      senha : ['123', [Validators.required]],
      tipoSangue : ['A+', [Validators.required]],
      pelotao : ['Charlie', [Validators.required]],
      patente : ['Monitor', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],  
      status : ['Ativo', [Validators.required]],
    });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
