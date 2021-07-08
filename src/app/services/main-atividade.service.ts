import { pipe } from 'rxjs';

import { BaseDto } from './../models/base-dto';

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SeviceGeralService } from './sevice-geral.service';
import { Pages } from '../models/pages';

@Injectable({
  providedIn: 'root'
})
export class MainAtividadeService {

  constructor(
    private spinner: NgxSpinnerService,
    private servicegeral: SeviceGeralService
  ) { }

  async getnomes(controller: string) {
    this.loadSpin();
    let retorno: string[];
    this.servicegeral.getnomes(controller)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )
  }
  async getAll(controller: string) {
    this.loadSpin();
    let retorno: any[];
    this.servicegeral.getAll(controller)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )
  }

   getAllsample(controller: string) :any {
    this.loadSpin();
    let retorno: BaseDto[];
    this.servicegeral.getAllsample(controller)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )
  }

     pagesample(controller: string, find: string, page,retornoany) : Pages {
    this.loadSpin();
    let retorno: Pages = null;
    this.servicegeral.pagesample(controller, find, page)

      .then(
        (response) => {
          retorno = response;
          console.log(response);

          this.demissSpin();
          retornoany=response;
          return retorno;
        }
      )
      return retorno;
  }

  findallpage(controller: string, find: string, page) {
    this.loadSpin();
    let retorno: Pages = null;
    this.servicegeral.findallpage(controller, find, page)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )

  }
  fingbyid(controller: string, find: string): any {
    this.loadSpin();
    let retorno: any = null;
    this.servicegeral.fingbyid(controller, find)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )
  }
  fingbynome(controller: string, find: string) {
    this.loadSpin();
    let retorno: any[] = null;
    this.servicegeral.fingbynome(controller, find)
      .then(
        (response) => {
          retorno = response;
          this.demissSpin();
          return retorno;
        }
      )
  }
  newobj(controller: string, obj: any): any {
    this.loadSpin();
    let retorno: any = null;
    this.servicegeral.newobj(controller, obj)
      .then(
        (response) => {
          retorno.id = response.body;
          this.demissSpin();
          return retorno;
        }
      )
  }
  saveobj(controller: string, obj: any, id): any {
    this.loadSpin();
    let retorno: any = null;
    this.servicegeral.saveobj(controller, obj, id)
      .then(
        (response) => {
          retorno.id = response.body;
          this.demissSpin();
          return retorno;
        }
      )
  }

  uploaffile(event, controller: string, obj: any): any {
    this.loadSpin();
 this.servicegeral.uploadfile(event, controller, obj.id,obj.imagem );

    return obj;
  }


  loadSpin() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
  }
  demissSpin() {
    this.spinner.hide();
  }


}
