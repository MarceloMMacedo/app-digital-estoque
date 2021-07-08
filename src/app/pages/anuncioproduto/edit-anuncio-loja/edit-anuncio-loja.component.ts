import { ItemProdutoAnuncio } from './../../../models/item-produto-anuncio';
import { MainAtividadeService } from 'src/app/services/main-atividade.service';
import { SimpleProdutoDto } from './../../../models/simple-produto-dto';
import { SampleDto } from './../../../models/sample-dto';

import { DescricaoAnuncio } from './../../../models/descricao-anuncio';
import { SeviceGeralService } from './../../../services/sevice-geral.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UtilsService } from './../../../services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioLoja } from 'src/app/models/anuncio-loja';
//import * as $ from 'jquery';
declare var $: any;
@Component({
  selector: 'app-edit-anuncio-loja',
  templateUrl: './edit-anuncio-loja.component.html',
  styleUrls: ['./edit-anuncio-loja.component.css']
})
export class EditAnuncioLojaComponent implements OnInit {
  index;
  controller = 'anunciosloja';
  validateForm!: FormGroup;
  isload: boolean = false;
  anunciosloja: AnuncioLoja;

  grupofinanceiros: SampleDto[];
  produtos: SimpleProdutoDto[];


  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private digital: MainAtividadeService,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.index = this.activatedRoute.snapshot.paramMap.get('id');

    this.servicegeral.getAllsampledto('grupofinanceiroanuncio')
      .then(
        rest => {
          this.grupofinanceiros = rest;
          console.log(rest);

        }
      )

    this.servicegeral.listany('produtos')
      .then(
        rest => {
          this.produtos = rest;
          console.log(rest);
        }
      )
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.anunciosloja = response;
          this.isload = true;
        },
        (error) => { }
      );
    this.validateForm = this.fb.group({
      produto: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      //   categoria: [null, [Validators.required]],
      //   unidade: [null, [Validators.required]],
      remember: [true]
    });
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  adddescricao() {
    let descricao: DescricaoAnuncio = {} as DescricaoAnuncio;
    this.anunciosloja.descricoes.push(descricao);
  }
  excluirdescricao(id): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja excluir descrição',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.anunciosloja.descricoes.splice(id, 1);
      }
    })
  }
  addproduto() {
    let descricao: ItemProdutoAnuncio = {} as ItemProdutoAnuncio;
    descricao.produto={};
    this.anunciosloja.itensProduto.push(descricao);
  }
  excluirproduto(id): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseja excluir produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.anunciosloja.itensProduto.splice(id, 1);
      }
    })
  }
  selectproduto(item, i) {
    let p = this.produtos.filter(el => el.id == item);
    console.log(p[0]);
    this.anunciosloja.itensProduto[i].valor=p[0].valor;
    this.anunciosloja.itensProduto[i].produto = p[0];
    this.anunciosloja.itensProduto[i].subtotal=p[0].valor * this.anunciosloja.itensProduto[i].quantidade;

  }

  save() {
    let img = this.anunciosloja.imagem;
    this.anunciosloja.imagem = null;
    this.servicegeral.saveobj(this.controller, this.anunciosloja, this.index)
      .then(
        (response) => {
          this.utilService.createNotification('success', 'Produto atualizado', 'Dados Salvo Com Socesso');
          this.servicegeral.fingbyid(this.controller, this.index)
            .then(
              (response) => {
                this.anunciosloja = response;
              },
              (error) => { }
            )
        },
        (error) => { }
      )
  }
  onClickImagePrincipal() {
    $('#imgupload').trigger('click');
  }

  async onUploadMainImage(event) {

    this.modalService.confirm({
      nzTitle: 'Deseja Alterar Imagem do produto?',
      nzContent: '<b style="color: red;"> A imagem do produto será atualiza</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: async () => {
        let imagem;
        this.digital.loadSpin()
        this.servicegeral.uploadfile(event, 'produtos', this.index, this.anunciosloja);
        this.servicegeral.fingbyid(this.controller, this.index)
          .then(
            (response) => {
              console.log(response);

              this.anunciosloja = response;
              this.isload = true;
            },
            (error) => { }
          );

      },
      nzCancelText: 'Não'
    });


  }
  cloneWeb(){
    this.modalService.confirm({
      nzTitle: 'Deseja anúncio para WEB?',
      nzContent: '<b style="color: red;"> O Anuncio Será Clonado</b>',
      nzOkText: 'Sim',
      nzOkType: 'danger',
      nzOnOk: async () => {
        let anuncioclone:AnuncioLoja=this.anunciosloja;
        anuncioclone.id=null;
        this.servicegeral.newobj('anuncioweb',anuncioclone)
        .then(
          rest=>this.utilService.createNotification('success','Sucesso','Novo anuncio criado com sucesso')
        )

      },
      nzCancelText: 'Não'
    });

  }
}
