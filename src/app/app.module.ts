import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProduitComponent } from './pages/produit/produit.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PanierComponent } from './pages/panier/panier.component';
import { CompteComponent } from './pages/compte/compte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { CoordonnerComponent } from './pages/coordonner/coordonner.component';
import { SuppressionComponent } from './pages/suppression/suppression.component';
import { HomeComponent } from './pages/home/home.component';
import { ListeproduitsComponent } from './pages/listeproduits/listeproduits.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { RechercheproduitsComponent } from './pages/rechercheproduits/rechercheproduits.component';
import { SharedModule } from './modules/shared/shared.module';
import { RecapitulatifComponent } from './pages/recapitulatif/recapitulatif.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { ChatComponent } from './components/chat/chat.component';
import { SliderComponent } from './components/slider/slider.component';
import { NavigationService } from './services/navigation.service';

export const AUTHENTICATION_CONFIG = {
  authEndpoint: "http://localhost:8080/users/login",
  initialPage: ""
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProduitComponent,
    ContactComponent,
    PanierComponent,
    CompteComponent,
    CommandesComponent,
    CoordonnerComponent,
    SuppressionComponent,
    ListeproduitsComponent,
    SearchbarComponent,
    RechercheproduitsComponent,
    RecapitulatifComponent,
    PaiementComponent,
    ChatComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule.forRoot(AUTHENTICATION_CONFIG)
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule { }