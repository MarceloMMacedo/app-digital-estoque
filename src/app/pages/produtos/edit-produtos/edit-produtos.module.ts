
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgxMaskModule } from 'ngx-mask';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { EditProdutosRoutingModule } from './edit-produtos-routing.module';
import { EditProdutosComponent } from './edit-produtos.component';
import { AvatarProdutosComponent } from '../avatar-produtos/avatar-produtos.component';
import { DescricaoProdutoComponent } from '../descricao-produto/descricao-produto.component';
import {  CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { NzListModule } from 'ng-zorro-antd/list';

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
    EditProdutosComponent,
    AvatarProdutosComponent,
    DescricaoProdutoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    NzListModule,
    NzInputModule,
    NzButtonModule,
    NzSkeletonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NzTableModule,
    NgbModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgbPaginationModule, NgbAlertModule,
    DemoNgZorroAntdModule,
    EditProdutosRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditProdutosModule { }
