import { ListPatrimonioRoutingModule } from './list-patrimonio-routing.module';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoNgZorroAntdModule } from 'src/app/ng-zorro-antd/ng-zorro-antd.module';
import { ListPatrimonioComponent } from './list-patrimonio.component';


@NgModule({
  declarations: [
    ListPatrimonioComponent
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
    ListPatrimonioRoutingModule
  ]
})
export class ListPatrimonioModule { }
