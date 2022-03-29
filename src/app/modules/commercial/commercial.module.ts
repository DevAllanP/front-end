import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommercialRoutingModule } from './commercial-routing.module';
import { ProduitajoutComponent } from './pages/produitajout/produitajout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CommercialComponent } from './commercial.component';
import { TagsComponent } from './pages/tags/tags.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TageditComponent } from './components/tagedit/tagedit.component';
import { TypesproduitComponent } from './pages/typesproduit/typesproduit.component';
import { TypeproduiteditComponent } from './components/typeproduitedit/typeproduitedit.component';
import { FraiseditComponent } from './components/fraisedit/fraisedit.component';
import { FraisComponent } from './pages/frais/frais.component';
import { ProduitlisteComponent } from './pages/produitliste/produitliste.component';
import { ProduiteditionComponent } from './pages/produitedition/produitedition.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { CommandeComponent } from './components/commande/commande.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProduitajoutComponent,
    DashboardComponent,
    CommercialComponent,
    TagsComponent,
    TageditComponent,
    TypesproduitComponent,
    TypeproduiteditComponent,
    FraiseditComponent,
    FraisComponent,
    ProduitlisteComponent,
    ProduiteditionComponent,
    CommandesComponent,
    CommandeComponent
  ],
  imports: [
    CommonModule,
    CommercialRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class CommercialModule { }
