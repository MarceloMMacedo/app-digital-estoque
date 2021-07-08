import { UtilsService } from './../../../services/utils.service';
import { SeviceGeralService } from './../../../services/sevice-geral.service';
import { SampleDto } from './../../../models/sample-dto';
import { Produto } from './../../../models/produto';
import { Component, OnInit, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CurrencyMaskInputMode } from 'ngx-currency';

@Component({
  selector: 'app-descricao-produto',
  templateUrl: './descricao-produto.component.html',
  styleUrls: ['./descricao-produto.component.css']
})
export class DescricaoProdutoComponent implements OnInit {

  @Input() produto: Produto;
  @Input() categorias: [];
  @Input() unidades: [];
 

  @Input() modelos: SampleDto[];
  constructor(
    private modalService: NzModalService,
    private utilServiece: UtilsService,
    private servicegeral: SeviceGeralService
  ) { }


  ngOnInit(): void {
  }
  addmodelo(input: HTMLInputElement): void {
  
    const value = input.value;
    console.log(value);
    
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Deseje incluir Modelo',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => {

       let m: SampleDto = {} as SampleDto;
        m.nome = value;
        this.servicegeral.findbynome('modelos', value)
          .then(
            rest => {
              if(rest!=null) 
             { this.utilServiece.createNotification('error', 'Alerta', 'Modelo ja existe: ' + m.nome);
            } else
             { 
              this.servicegeral.newobj('modelos', m)
              .then(
                (response) => {
                  alert(response)
                  m.id = (response.body); 
                 this.modelos= [...this.modelos, m ]
                 this.produto.modelo=m;
                },
                (error) => {
                  console.log(error);
        
                }
              )
            }
          }); 

      }
    });
  }
}

