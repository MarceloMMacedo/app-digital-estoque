
import { BaseDto } from './../../../models/base-dto';
import { FornecedorProduto } from './../../../models/fornecedor-produto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CnpjClient } from './../../../models/cnpj-client';
import { UtilsService } from './../../../services/utils.service';
import { SampleDto } from './../../../models/sample-dto';
import { Produto } from './../../../models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SeviceGeralService } from './../../../services/sevice-geral.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainAtividadeService } from './../../../services/main-atividade.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-produtos',
  templateUrl: './edit-produtos.component.html',
  styleUrls: ['./edit-produtos.component.css']
})
export class EditProdutosComponent implements OnInit {

  produto: Produto;
  index;
  controller = 'produtos';
  isload: boolean = false;

  isVisible = false;
  categorias: [];
  unidades: [];
  fornecedores: BaseDto[];
  modelos: SampleDto[];
  fornecedorProduto: FornecedorProduto = {} as FornecedorProduto;
  cnpjcpf = '';
  nomefornecedor = '';
  fornecedor: CnpjClient;

  validateForfornecedor!: FormGroup;

  iseditfornecedores = false;
  idexfornecedorproduto;
  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private servicegeral: SeviceGeralService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.fornecedorProduto = {} as FornecedorProduto;
    this.fornecedorProduto.fornecedor = {} as BaseDto;
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      remember: [true]
    });

    this.validateForfornecedor = this.fb.group({
      fornecedor: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      remember: [true]
    });


    this.index = this.activatedRoute.snapshot.paramMap.get('id');
    this.servicegeral.fingbyid(this.controller, this.index)
      .then(
        (response) => {
          this.produto = response;
          console.log(response);
          this.isload = true;
        },
        (error) => { }
      )
    //unidades
    this.servicegeral.getlistageral('produtos', 'listaunidade')
      .then(
        rest => {
          this.unidades = rest;
        }
      )
    //categoria
    this.servicegeral.getlistageral('produtos', 'listacategoriaproduto')
      .then(
        rest => {
          this.categorias = rest;
        }
      )
    this.getmodelos();

    this.getAllFornecedores();

  }
  getmodelos() {
    this.servicegeral.getAll('modelos')
      .then(
        (response) => {
          this.modelos = response;
          console.log(response);
          this.isload = true;
        },
        (error) => { }
      )
  }
  onSave() {

    let img = this.produto.imagem;
    this.produto.imagem = null;
    this.servicegeral.saveobj(this.controller, this.produto, this.index)
      .then(
        (response) => {
          this.utilService.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');
          this.servicegeral.fingbyid(this.controller, this.index)
            .then(
              (response) => {
                this.produto = response;
              },
              (error) => { }
            )
        },
        (error) => { }
      )
    this.produto.imagem = img;
  }

  showModal(): void {
    this.cnpjcpf = '';
    this.nomefornecedor = '';
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.iseditfornecedores = false;
    // this.showConfirm();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.iseditfornecedores = false;
  }
  isCPF(): boolean {
    return this.cnpjcpf == null ? true : this.cnpjcpf.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  getfornecedorprocnpj() {
    this.servicegeral.getcnpj('fornecedores', '0', this.cnpjcpf)
      .then(
        (rest) => {
          this.fornecedor = rest;
          this.nomefornecedor = this.fornecedor.nome;
        }
      )
  }
  showConfirmincluirfornecedor(): void {
    this.modalService.confirm({
      nzTitle: 'Confirmação',
      nzContent: 'Deseja incluir fornecedor: ' + this.nomefornecedor,
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.fornecedor.cnpj = this.cnpjcpf;
        this.fornecedor.nome = this.nomefornecedor;
        console.log(this.fornecedor);

        this.servicegeral.newobj('fornecedores', this.fornecedor).then(
          res => {
            this.message.success('Fornecedo cadastrado com sucesso', { nzDuration: 1000 });
            this.isVisible = false;
            this.getAllFornecedores()
          }

        )
      }
    });
  }
  getAllFornecedores() {
    this.servicegeral.getAllsample('fornecedores')
      .then(
        (rest) => {
          this.fornecedores = rest;
          console.log(rest);

        }
      )

  }
  newfornecedores() {
    // this.getAllFornecedores();
    this.fornecedorProduto = {} as FornecedorProduto;
    this.fornecedorProduto.fornecedor = {} as BaseDto;
    this.iseditfornecedores = true;
    this.idexfornecedorproduto=0;

  }
  submitFornecedor(): void {
    for (const i in this.validateForfornecedor.controls) {
      this.validateForfornecedor.controls[i].markAsDirty();
      this.validateForfornecedor.controls[i].updateValueAndValidity();
    }
  }
  newfornecedorproduto() {
    this.idexfornecedorproduto=0;
    this.fornecedorProduto={} as FornecedorProduto;
  }
  inserirfornecedor() {
if(this.idexfornecedorproduto==0)
 this.produto.fornecedoresproduto.push(this.fornecedorProduto);
    let img = this.produto.imagem;
    this.produto.imagem = null;
    this.servicegeral.saveobj('produtos', this.produto, this.produto.id)
      .then(
        (response) => {

          this.utilService.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');

          this.iseditfornecedores = false;
          this.servicegeral.fingbyid(this.controller, this.index)
            .then(
              (response) => {
                this.produto = response;
              },
              (error) => { }
            )
        },
        (error) => { }
      )
    this.produto.imagem = img;
  }
  setfornecedorproduto(value: FornecedorProduto) {

    this.fornecedorProduto = value;
    this.iseditfornecedores = true;
  }
  excluirfornecedorproduto(obj, i) {
    this.modalService.confirm({
      nzTitle: 'Confirmação',
      nzContent: 'Deseja Excluir fornecedor: ' + obj,
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.produto.fornecedoresproduto.splice(i, 1);
        this.servicegeral.saveobj('produtos', this.produto, this.produto.id)
          .then(
            (response) => {

              this.utilService.createNotification('success', 'Dados Salvo Com Socesso', 'Produto atualizado');

              this.servicegeral.fingbyid(this.controller, this.index)
                .then(
                  (response) => {
                    this.produto = response;
                  },
                  (error) => { }
                )
            },
            (error) => { }
          )


      }
    });
  }

}
