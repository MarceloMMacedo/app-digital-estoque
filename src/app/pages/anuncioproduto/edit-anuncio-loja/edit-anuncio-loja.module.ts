import { NgxCurrencyModule } from 'ngx-currency';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditAnuncioLojaComponent } from "./edit-anuncio-loja.component";
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';
import { EditAnuncioLojaRoutingModule } from './edit-anuncio-loja-routing.module';
import { DescricaoProdutoComponent } from '../descricao-produto/descricao-produto.component';



export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    EditAnuncioLojaComponent,
    DescricaoProdutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxSpinnerModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    DemoNgZorroAntdModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    EditAnuncioLojaRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditAnuncioLojaModule { }
