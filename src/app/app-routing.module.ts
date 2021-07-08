import { AuthGuard } from './account/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'digital',
    pathMatch: 'full'
  },
  {
    path: 'digital',
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/home/digital/digital.module').then(m => m.DigitalModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
