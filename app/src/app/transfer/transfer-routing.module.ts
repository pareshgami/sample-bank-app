import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferPage } from './transfer.page';
import { TransferResolver } from './transfer.resolver';

const routes: Routes = [
  {
    path: '',
    component: TransferPage,
    resolve: {
      transfers: TransferResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferPageRoutingModule {}
