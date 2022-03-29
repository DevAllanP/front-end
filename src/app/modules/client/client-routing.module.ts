import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from "src/app/auth/auth.module";
import { LibraryConfig } from 'src/app/auth/models/config';
import { ChangemdpComponent } from './pages/changemdp/changemdp.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { CompteComponent } from "./pages/compte/compte.component";
import { CoordonnerComponent } from './pages/coordonner/coordonner.component';
import { SuppressionComponent } from './pages/suppression/suppression.component';

const clientroutes: Routes = [
  { path: 'commandes', component: CommandesComponent },
  { path: 'coordonner', component: CoordonnerComponent },
  { path: 'changermdp', component: ChangemdpComponent },
  { path: 'suppression', component: SuppressionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(clientroutes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
  static forRoot(config: LibraryConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [{ provide: 'config', useValue: config }]
    };
  }
 }
