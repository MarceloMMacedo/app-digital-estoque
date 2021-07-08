import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { NzNotificationService } from 'ng-zorro-antd/notification'; 
import { Observable } from 'rxjs';
//import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
export enum TypeMsg {
  Success = "Success",
  Info = "Info",
  Warn = "Warn",
  Error = "Error"
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    public http: HttpClient,
    private toastrService: ToastrService,
    //private messageService: MessageService,
    private spinner: NgxSpinnerService,
    //   private notification: NzNotificationService
    //public cepService: CepService 
  ) { }
  utilspinnerShow() {
    this.spinner.show();

  /*  setTimeout(() => {
      /** spinner ends after 5 seconds 
      this.spinner.hide();
    }, 5000);
    */
  } 
  utilspinnerHide() { 
      this.spinner.hide(); 
  }
  getNewId(): string {
    let d = new Date();
    let n = d.getTime();
    const chars = n + 'abcdefghijklmnopqrstuv';
    let randominputstring = '';
    for (let i = 0; i < 20; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randominputstring += chars.substring(rnum, rnum + 1);
    }
    return randominputstring;
  }

  createNotification(type, msg, title): void {
    // this.messageService.add({ severity: type, summary: title, detail: msg });
    switch (type) {
      case 'success':
        this.toastrService.success(title, msg);
        break;
      case "info":
        this.toastrService.info(title, msg);
        break;
      case "warn":
        this.toastrService.warning(title, msg);
        break;
      case "error":
        this.toastrService.error(title, msg);
        break;
      default:
    }
  }
  numberToReal(numero) {
    var n: number = Number(numero);
    var nume = n.toFixed(2).split('.');
    nume[0] = "R$ " + nume[0].split(/(?=(?:...)*$)/).join('.');
    return nume.join(',');
  }
  getDataCompanyCNPJ(company: any): any {
    console.log(this.apenasNumeros(company.cpfOnCnpj));
    this.getDataReceita(this.apenasNumeros(company.cnpj)).subscribe(
      retorno => {
        if (retorno.status == 'OK') {
          ////console.log(retorno); 
          company.capital_social = this.numberToReal(retorno.capital_social);
          company.data_situacao = retorno.data_situacao;
          company.natureza = retorno.natureza;
          company.natureza_juridica = retorno.natureza_juridica;
          company.code = retorno.atividade_principal[0].code;
          company.name = retorno.nome;
          company.atividade_principal = retorno.atividade_principal[0].text;
          company.nameFantasia = retorno.fantasia;


          ;
          let msg = 'Consulta Realizado com Sucesso';
          let tipo = 'success'
          this.createNotification('Sucesso', 'Sucesso', msg);
        }
        else {
          this.createNotification('error', 'CNPJ inválido', "Ocorreu um erro durante a consulta, tente mais tarde!");
        }
      }
    )
    return company;
  }
  /* getDataPessoaCNPJ(company: Pessoa): any {
     this.getDataReceita(this.apenasNumeros(company.cnpj)).subscribe(
       retorno => {
         if (retorno.status == 'OK') {
           ////console.log(retorno); 
           company.capital_social = this.numberToReal(retorno.capital_social);
           company.data_situacao = retorno.data_situacao;
           company.natureza = retorno.natureza;
           company.natureza_juridica = retorno.natureza_juridica;
           company.code = retorno.atividade_principal[0].code;
           company.name = retorno.nome;
           company.atividade_principal = retorno.atividade_principal[0].text;
           company.bairro = retorno.bairro;
           company.city = retorno.municipio;
           company.state = retorno.uf;
           company.nro = retorno.numero;
           company.zipCode = retorno.cep;
           company.street = retorno.logradouro;
           company.complement = retorno.complemento;
 
           company.bairro = retorno.bairro;
           company.city = retorno.municipio;
           company.state = retorno.uf;
           company.nro = retorno.numero;
           company.zipCode = retorno.cep;
           company.street = retorno.logradouro;
           company.complement = retorno.complemento;
 
           ;
           let msg = 'Consulta Realizado com Sucesso';
           let tipo = 'success'
           this.createNotification('Sucesso', 'Sucesso', msg);
         }
         else {
           this.createNotification('error', 'CNPJ inválido', "Ocorreu um erro durante a consulta, tente mais tarde!");
         }
       }
     )
     return company;
   }
   */

  getDataReceita(cnpj: string): any {
    return this.http.jsonp<any>(`https://www.receitaws.com.br/v1/cnpj/` + cnpj, 'callback');
  }
  getEnderecoPorCep(company: any): any {
    console.log(company);
    let cep = company.zipCode;
    this.getDataCep(this.apenasNumeros(company.zipCode)).subscribe(
      dados => {
        //console.log((dados));
        if (!("erro" in dados)) {
          // Atualiza os campos com os valores
          // da consulta.
          //   company.enderecoPrincipal={} as Endereco;
          company.zipCode = cep;
          company.street = dados.logradouro;
          company.bairro = dados.bairro;
          company.city = dados.localidade;
          company.state = dados.uf;
          let msg = 'Consulta de enderço por CEP realizado com sucesso';
          let tipo = 'success'
          this.createNotification('Sucesso', 'Sucesso', msg);
        } // end if.
        else {
          // CEP pesquisado não foi
          // encontrado.
          this.createNotification('error', 'CEP inválido', "Endereço não localizado");
        }
      }
    )
    //console.log(company);
    return company;
  }
  getDataCep(cep: string): any {
    return this.http.get<any>("https://viacep.com.br/ws/" + cep + "/json/");
  }
  apenasNumeros(string: string) {
    console.log(string);
    var numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }
  getEndereco(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  consultacep(cep): any {
    let endereco: any;
    let interval = setInterval(async () => {

      let cepjdigito = this.apenasNumeros(cep);
      await this.getEndereco(cepjdigito).subscribe(
        dados => {
          ////console.log((dados));
          if (!("erro" in dados)) {
            // Atualiza os campos com os valores
            // da consulta.
            endereco.street = dados.logradouro;
            endereco.bairro = dados.bairro;
            endereco.city = dados.localidade;
            endereco.state = dados.uf;
            let msg = 'Consulta de enderço por CEP realizado com sucesso';
            let tipo = 'success'
            this.createNotification('Sucesso', 'Sucesso', msg);
          } // end if.
          else {
            // CEP pesquisado não foi
            // encontrado.
            this.createNotification('error', 'CEP inválido', "Endereço não localizado");
          }
        }
      )
      clearInterval(interval);

    }, 1000);
    return endereco;
  }

}
