import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { AdminComponent } from './modules/admin/admin.component';
import { CommercialComponent } from './modules/commercial/commercial.component';
import { ClientComponent } from './modules/client/client.component';
import { ListeproduitsComponent } from './pages/listeproduits/listeproduits.component';
import { PanierComponent } from './pages/panier/panier.component';
import { RechercheproduitsComponent } from './pages/rechercheproduits/rechercheproduits.component';
import { RecapitulatifComponent } from './pages/recapitulatif/recapitulatif.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { forAnonymous: true } },
  { path: 'produit/:id', component: ProduitComponent },
  { path: 'produits/:label', component: ListeproduitsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'commercial', component: CommercialComponent, loadChildren: () => import("./modules/commercial/commercial.module").then(m => m.CommercialModule), canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: 'ROLE_COMMERCIAL' } },
  { path: 'admin', component: AdminComponent, loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule), canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'client', component: ClientComponent, loadChildren: () => import("./modules/client/client.module").then(m => m.ClientModule), canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: 'ROLE_CLIENT' } },
  { path: 'recherche', component: RechercheproduitsComponent},
  { path: 'recapitulatif', component: RecapitulatifComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: 'ROLE_CLIENT' }},
  { path: 'paiement/:type', component: PaiementComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { expectedRole: 'ROLE_CLIENT' }},
  { path: 'questions', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
