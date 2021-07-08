import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPatrimonioRoutingModule } from './edit-patrimonio-routing.module';
import { EditPatrimonioComponent } from './edit-patrimonio.component';


@NgModule({
  declarations: [
    EditPatrimonioComponent
  ],
  imports: [
    CommonModule,
    EditPatrimonioRoutingModule
  ]
})
export class EditPatrimonioModule { }
