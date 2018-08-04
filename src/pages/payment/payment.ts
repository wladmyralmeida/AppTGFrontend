import { UsuarioDTO } from './../../models/usuario.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { CartService } from '../../services/domain/cart.service';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  items: UsuarioDTO[];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public storage: StorageService,
    public usuarioService: UsuarioService,
    public cartService: CartService) {

    //Pega o objeto de pedido que vai vir na navegação da página de compras. Não tem endereço.
    this.pedido = this.navParams.get('pedido');

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.usuarioService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['usuarios'];

          let cart = this.cartService.getCart();

          this.pedido = {//Pega o Id da Resposta, que é o usuário completo.
            usuario: { id: response['id'] },
            pagamento: null,
            //Pega o carrinho no localStorage, percorre a lista do mesmo, convertendo cada obj para novo formato.
            itens: cart.items.map(x => { return { quantidade: x.quantidade, produto: { id: x.produto.id } } })
          }
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }


  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }
}