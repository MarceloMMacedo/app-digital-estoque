import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';
import { ListAnuncioProdutRoutingModule } from './list-anuncio-produt-routing.module';
import { ListAnuncioProdutComponent } from './list-anuncio-produt.component';


@NgModule({
  declarations: [
    ListAnuncioProdutComponent,
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
    NgbPaginationModule, NgbAlertModule,
    DemoNgZorroAntdModule,
    ListAnuncioProdutRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListAnuncioProdutModule { }
