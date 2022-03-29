import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';
import { CompteComponent } from './pages/compte/compte.component';
import { ClientComponent } from './client.component';
import { CoordonnerComponent } from './pages/coordonner/coordonner.component';
import { SuppressionComponent } from './pages/suppression/suppression.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { ChangemdpComponent } from './pages/changemdp/changemdp.component';
import { SharedModule } from '../shared/shared.module';
import { ModalCoordComponent } from 'src/app/components/modal-coord/modal-coord.component';
import { CommandeComponent } from './components/commande/commande.component';

@NgModule({
  declarations: [
    CompteComponent,
    CoordonnerComponent,
    SuppressionComponent,
    CommandesComponent,
    ChangemdpComponent,
    ClientComponent,
    ModalCoordComponent,
    CommandeComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClientModule { }