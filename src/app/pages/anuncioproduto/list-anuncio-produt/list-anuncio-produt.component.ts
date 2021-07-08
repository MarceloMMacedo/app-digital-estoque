import { ItemProdutoAnuncio } from './../../../models/item-produto-anuncio';
import { SampleDto } from './../../../models/sample-dto';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AnuncioLoja } from './../../../models/anuncio-loja';
import { BaseDto } from './../../../models/base-dto';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pages } from 'src/app/models/pages';
import { MainAtividadeService } from 'src/app/services/main-atividade.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { SeviceGeralService } from 'src/app/services/sevice-geral.service';

@Component({
  selector: 'app-list-anuncio-produt',
  templateUrl: './list-anuncio-produt.component.html',
  styleUrls: ['./list-anuncio-produt.component.css']
})
export class ListAnuncioProdutComponent implements OnInit {

  isVisible = false;
  produto: SampleDto;
  nome;
  pages: Pages = {} as Pages;
  value: string = '';
  page: number = 1;
  last: boolean;
  isrealy: boolean = false;
  controller = 'anunciosloja';
  validateForm!: FormGroup;
  produtos: BaseDto[];
  anuncioLoja: AnuncioLoja = {} as AnuncioLoja;

  private subject: Subject<string> = new Subject();
  private destroy$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private mainAtiviadade: MainAtividadeService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private nzMessage: NzMessageServiceModule,
    private servicegeral: SeviceGeralService
  ) { }

  ngOnInit(): void {
    this.servicegeral.getAllsample('produtos')
      .then(
        (rest) => {
          this.produtos = rest;
          console.log(rest);

        }
      )
    this.getLista();
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
      ;
    });

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
  onKeyUp(event) {

    this.subject.next(event.target.value);
    //  this.compararfrase();
  }
  getLista() {
    //  this.mainAtiviadade.pagesample(this.controller, this.value, this.page - 1);
    this.servicegeral.pagesample(this.controller, this.value, this.page - 1)
      .then(
        (response) => {
          this.pages = response;
          console.log(response);

          this.isrealy = true;
          this.mainAtiviadade.demissSpin();

        }
      )
  }


  showModal(): void {
    this.produto = {} as BaseDto;
    this.isVisible = true;
  }
  changepage() {

    this.getLista();
  }

  //cadastro
  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk() {


    console.log(this.anuncioLoja);

    this.isVisible = false;
    this.showConfirm();
  }
  onChange(value: { id: number, nome: string }): void {
    this.nome = value.nome;

  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir Produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        this.anuncioLoja = {} as AnuncioLoja;
         this.anuncioLoja.itensProduto=[]
        let it:ItemProdutoAnuncio={} as ItemProdutoAnuncio;
        it.produto={} as SampleDto;
        it.produto.id=this.produto.id;

        it.quantidade=1;
        this.anuncioLoja.itensProduto.push(it);
        this.anuncioLoja.nome = this.nome;
        console.log(this.anuncioLoja);

        this.servicegeral.newobj(this.controller , this.anuncioLoja).then(
          (rest) =>
            this.router.navigate(['digital/list-anuncio-loja/', rest.body])
        )
      }
    })
  }
}
