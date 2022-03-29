import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { listProduit } from 'src/app/models/listProduit.model';
const routes: Routes = [
  { path: "test", component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripePaiementRoutingModule { }
