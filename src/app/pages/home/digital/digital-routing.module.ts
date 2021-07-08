import { AuthGuard } from './../../../account/auth.guard';
import { ListProdutosComponent } from './../../produtos/list-produtos/list-produtos.component';
import { DigitalComponent } from './digital.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component: DigitalComponent,
    children:[
      {path:'list-produtos',
      runGuardsAndResolvers: 'always',
      loadChildren: () => import('./../../produtos/list-produtos/list-produtos.module').then(m => m.ListProdutosModule)
      },
      {path:'edit-produtos/:id',
      runGuardsAndResolvers: 'always',
      loadChildren: () => import('./../../produtos/edit-produtos/edit-produtos.module').then(m => m.EditProdutosModule)
      },
      {path:'list-anuncio-loja',
      runGuardsAndResolvers: 'always',
      loadChildren: () => import('./../../anuncioproduto/list-anuncio-produt/list-anuncio-produt.module').then(m => m.ListAnuncioProdutModule)
      },
      {path:'list-anuncio-loja/:id',
      runGuardsAndResolvers: 'always',
      loadChildren: () => import('./../../anuncioproduto/edit-anuncio-loja/edit-anuncio-loja.module').then(m => m.EditAnuncioLojaModule)
      },
      {path:'list-patrimonio',
      runGuardsAndResolvers: 'always',
      loadChildren: () => import('./../../patrimonio/list-patrimonio/list-patrimonio.module').then(m => m.ListPatrimonioModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalRoutingModule { }
