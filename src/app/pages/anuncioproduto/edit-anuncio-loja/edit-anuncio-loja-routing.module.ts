import { EditAnuncioLojaComponent } from './edit-anuncio-loja.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:EditAnuncioLojaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditAnuncioLojaRoutingModule { }
