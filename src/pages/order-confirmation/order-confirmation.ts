import { UsuarioService } from './../../services/domain/usuario.service';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { PedidoService } from '../../services/domain/pedido.service';
import { UsuarioDTO } from '../../models/usuario.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  usuario: UsuarioDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public cartService: CartService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
////ASDUSAGDYASGDSAYGDSAD>>>>>>>>>
    this.usuarioService.findByEmail(this.pedido.usuario.id)
      .subscribe(response => {
        this.usuario = response as UsuarioDTO;
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  total() : number {
    return this.cartService.total();
  } 

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
