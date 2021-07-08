import { Patrimonio } from './../../../models/patrimonio';
import { Router } from '@angular/router';
import { SampleDto } from './../../../models/sample-dto';
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
  selector: 'app-list-patrimonio',
  templateUrl: './list-patrimonio.component.html',
  styleUrls: ['./list-patrimonio.component.css']
})
export class ListPatrimonioComponent implements OnInit {
  isVisible = false;
  namepartimonio = '';
  pages: Pages = {} as Pages;
  value: string = '';
  page: number = 0;
  last: boolean;
  isrealy: boolean = false;
  controller = 'patrimonios';
  validateForm!: FormGroup;

  modelos: string[];
  inputmodelo?: string;
  filteredOptions: string[] = [];

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

    this.validateForm = this.fb.group({
      namepartimonio: [null, [Validators.required]],
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
          console.log(response);

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
    this.namepartimonio = '';
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
      nzContent: 'Deseje incluir patrimonio',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        let p: Patrimonio = {} as Patrimonio;
        p.nome = this.namepartimonio;
        let m: SampleDto = {} as SampleDto;
        m.nome = this.inputmodelo;
        this.servicegeral.findbynome('modelos', this.inputmodelo)
          .then(
            rest => {
              if (rest != null) {
                m = rest;
                p.modelo = m;
                this.addnamepartimonio(p);
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
  addnamepartimonio(p) {
    this.servicegeral.newobj(this.controller, p)
      .then(
        (response) => {
          console.log(response.body);
          this.router.navigate(['digital/edit-partimonios', response.body]);
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
          this.addnamepartimonio(p);
        },
        (error) => {
          console.log(error);

        }
      )
  }
  onChange(value: string): void {
    this.filteredOptions = this.modelos.filter(option =>
      option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    this.namepartimonio = '';
  }
  categoriaChange(value: string): void {
    this.namepartimonio = '';
    this.namepartimonio = value + ' ' + this.namepartimonio + ' ' + this.inputmodelo;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



}
//lista
