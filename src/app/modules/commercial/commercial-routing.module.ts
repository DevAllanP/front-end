import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from 'src/app/auth/auth.module';
import { ErrorInterceptor } from 'src/app/auth/interceptors/error.interceptor';
import { TokenInterceptor } from 'src/app/auth/interceptors/token.interceptor';
import { LibraryConfig } from 'src/app/auth/models/config';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { FraisComponent } from './pages/frais/frais.component';
import { ProduitajoutComponent } from './pages/produitajout/produitajout.component';
import { ProduiteditionComponent } from './pages/produitedition/produitedition.component';
import { ProduitlisteComponent } from './pages/produitliste/produitliste.component';
import { TagsComponent } from './pages/tags/tags.component';
import { TypesproduitComponent } from './pages/typesproduit/typesproduit.component';

const routes: Routes = [
  { path: "produit/ajout", component: ProduitajoutComponent },
  { path: "produit/liste", component: ProduitlisteComponent },
  { path: "produit/edition/:id", component: ProduiteditionComponent },
  { path: "commandes", component: CommandesComponent },
  { path: "frais", component: FraisComponent },
  { path: "typesproduit", component: TypesproduitComponent },
  { path: "tags", component: TagsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class CommercialRoutingModule {
  static forRoot(config: LibraryConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [{ provide: 'config', useValue: config }]
    };
  }
}
