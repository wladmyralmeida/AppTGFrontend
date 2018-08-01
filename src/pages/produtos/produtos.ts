import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  //Sempre que buscar uma nova página, ela será concatenada com uma já existente.
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  //Todos os dados na nova função para que possa também ser chamada no refresh
  loadData() {
    let cat_id = this.navParams.get('cat_id');
    //Abre o loader;
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(cat_id, this.page, 10)
      .subscribe(response => {
        //tamanho que a lista tinha = 0, 10, 20, 30;
        let start = this.items.length;
        //Concatenação
        this.items = this.items.concat(response['content']);
        //tamanho que a lista tinha -1 = 9, 19, 29;
        let end = this.items.length - 1;
        //Fecha o loader antes de carregar as imagens ou se acontecer algum erro;
        loader.dismiss();
        console.log(this.page);
        console.log(this.items);
        //Somente é chamado depois de chegados os produtos, 
        this.loadImageUrls(start, end);
      },
        error => {
          loader.dismiss();
        });
  }

  //Como é uma página de múltiplos produtos que estão em items[],percorre a lista de produtos e pega uma
  //referência para o produto e chama o serviço passando o id do produto
  //se a imagem existir, pega a referencia do imageUrl e montar a url novamente.
  loadImageUrls(start: number, end: number) {
    for (var i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  //Envia o produto id como parâmetro na navegação, criando um objeto com o valor sendo seu id.
  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produto_id: produto_id });
  }

  //Durar o loading enquanto tiver carregando mesmo a página. Retornando o objeto para qualquer página que precisar.
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  //Carrega os dados e dá o refresh em 1 segundo.
  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
