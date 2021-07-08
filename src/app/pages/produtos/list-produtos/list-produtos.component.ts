import { Router } from '@angular/router';
import { SampleDto } from './../../../models/sample-dto';
import { Produto } from './../../../models/produto';
import { SeviceGeralService } from './../../../services/sevice-geral.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainAtividadeService } from './../../../services/main-atividade.service';
import { Pages } from './../../../models/pages';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.css']
})
export class ListProdutosComponent implements OnInit , OnDestroy {


  isVisible = false;
  produto = '';
  pages: Pages = {} as Pages;
  value: string = '';
  page: number = 0;
  last: boolean;
  isrealy: boolean = false;
  controller = 'produtos';
  validateForm!: FormGroup;

  modelos: string[];
  inputmodelo?: string;
  filteredOptions: string[] = [];

  categoria = '';
  unidade = '';
  categorias: [];
  unidades: [];

  private subject: Subject<string> = new Subject();
  private destroy$ = new Subject();
  constructor(
    private modalService: NzModalService,
    private fb: FormBuilder,
    private mainAtiviadade: MainAtividadeService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private nzMessage: NzMessageServiceModule,
    private servicegeral: SeviceGeralService) { }

  ngOnInit(): void {
    this.mainAtiviadade.loadSpin();
    this.servicegeral.getnomes('modelos')
      .then(
        rest => {
          this.modelos = rest;
          this.filteredOptions = this.modelos;

        }
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
    this.validateForm = this.fb.group({
      produto: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      unidade: [null, [Validators.required]],
      remember: [true]
    });
    this.getLista();
    this.subject.pipe(
      debounceTime(1000)
    ).subscribe(searchTextValue => {
      console.log(searchTextValue);
      this.getLista();
      ;
    });
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
          this.isrealy = true;
          this.mainAtiviadade.demissSpin();

        }
      )
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  changepage() {
    console.log(this.page);

    this.getLista();
  }

  showModal(): void {
    this.produto = '';
    this.inputmodelo = '';
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
    this.showConfirm();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir Produto',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let p: Produto = {} as Produto;
        p.nome = this.produto;
        p.categoria = this.categoria;
        p.unidade = this.unidade;
        let m: SampleDto = {} as SampleDto;
        m.nome = this.inputmodelo;
        this.servicegeral.findbynome('modelos', this.inputmodelo)
          .then(
            rest => {
              if (rest != null) {
                m = rest;
                p.modelo = m;
                this.addproduto(p);
              } else {
                this.modalService.confirm({
                  nzTitle: 'Confirm',
                  nzContent: 'Modelo inexistente Deseja Adicionar o modelo: ' + this.inputmodelo + ' ?',
                  nzOkText: 'OK',
                  nzCancelText: 'Cancel',
                  nzOnOk: () => {
                    this.addmodelo(m, p);
                  },
                  nzOnCancel: () => {
                    return;
                  }
                }
                );
              }
            })


        console.log(p);


      }
    });
  }
  addproduto(p) {
    this.servicegeral.newobj(this.controller, p)
      .then(
        (response) => {
          console.log(response.body);
          this.router.navigate(['digital/edit-produtos', response.body]);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  addmodelo(m: SampleDto, p) {
    this.servicegeral.newobj('modelos', m)
      .then(
        (response) => {
          m.id = (response.body);
          p.modelo = m;
          this.addproduto(p);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  onChange(value: string): void {
    this.filteredOptions = this.modelos.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    this.produto = '';
    this.produto = this.categoria + ' ' + this.produto + ' ' + value;
  }
  categoriaChange(value: string): void {
    this.produto = '';
    this.produto = value + ' ' + this.produto + ' ' + this.inputmodelo;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
 //lista

class MyDataSource extends DataSource<any> {
  private pageSize = 10;
  private cachedData: any[] = [];
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<any[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();

  constructor( private servicegeral: SeviceGeralService) {
    super();
  }

  completed(): Observable<void> {
    return this.complete$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    this.setup(collectionViewer);
    return this.dataStream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  private setup(collectionViewer: CollectionViewer): void {
    this.fetchPage(0);
    collectionViewer.viewChange.pipe(takeUntil(this.complete$), takeUntil(this.disconnect$)).subscribe(range => {
      if (this.cachedData.length >= 50) {
        this.complete$.next();
        this.complete$.complete();
      } else {
        const endPage = this.getPageForIndex(range.end);
        this.fetchPage(endPage + 1);
      }
    });
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    /*this.http
      .get<{ results: ItemData[] }>(`https://randomuser.me/api/?results=${this.pageSize}&inc=name,gender,email,nat&noinfo`)
      .subscribe(res => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.results);
        this.dataStream.next(this.cachedData);
      });
      */
      /*this.servicegeral.pagesample(this.controller, this.value, this.page - 1)
      .then(
        (res) => {
          this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.results);
          this.dataStream.next(this.cachedData);
        }
      )*/
  }
}
