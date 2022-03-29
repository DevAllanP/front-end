import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit } from 'src/app/models/Produit.model';
import { StripePaiementRoutingModule } from './stripe-paiement-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormGroup } from '@angular/forms';
import { listProduit } from 'src/app/models/listProduit.model';

@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    StripePaiementRoutingModule
  ]
})
export class StripePaiementModule { }
