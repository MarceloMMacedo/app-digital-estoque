import { DigitalHeardComponent } from './../digital-heard/digital-heard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigitalRoutingModule } from './digital-routing.module';
import { DigitalComponent } from './digital.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    DigitalComponent,
    DigitalHeardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    DigitalRoutingModule
  ]
})
export class DigitalModule { }
