import { MainAtividadeService } from './../../../services/main-atividade.service';
import { Observable } from 'rxjs';
import { SeviceGeralService } from './../../../services/sevice-geral.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { NgxSpinnerService } from 'ngx-spinner';
//import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: 'app-avatar-produtos',
  templateUrl: './avatar-produtos.component.html',
  styleUrls: ['./avatar-produtos.component.css']
})
export class AvatarProdutosComponent implements OnInit {

  @Input() produto: Produto;
  constructor(
    private modal: NzModalService,
    private spinner: NgxSpinnerService ,
    private digital:MainAtividadeService,
    private servicegeral: SeviceGeralService
  ) { }

  ngOnInit(): void {
  }
  //load imagem

  onClickImagePrincipal() {
    $('#imgupload').trigger('click');
  }

  async onUploadMainImage(event) {

    this.modal.confirm({
      nzTitle: 'Deseja Alterar Imagem do produto?',
      nzContent: '<b style="color: red;">É preciso Salvar para gravar os dados</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: async () => {
        let imagem;
        this.digital.loadSpin()
        this.produto =    this.servicegeral.uploadfile(event, 'produtos', this.produto.id, this.produto);

        this.produto.imagem = imagem;

      },
      nzCancelText: 'Não'
    });


  }
}
