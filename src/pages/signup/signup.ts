import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      numero : ['25', []],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      senha : ['123', [Validators.required]],
      tipoSangue : ['A+', []],
      organizacaoMilitar : ['TG-07-002', []],
      pelotao : ['A+', []],
      patente : ['Sub-tentente', []],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []]    
    });
  }

  signupUser() {
    this.usuarioService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
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
