import { NavigationExtras, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Produit } from 'src/app/models/Produit.model';
import { CommandesService } from 'src/app/services/commandes.service';
import { ModalService } from 'src/app/services/modal.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  total: number = 0;
  qteTotal:number = 0;
  alert: string = "";
  prdsInCart: Produit[] = new Array();

  constructor(private authService: AuthService, private panierService: PanierService, private modalService: ModalService, private router: Router, private cmdService: CommandesService) { 

  }

  ngOnInit(): void {
    if(this.authService.isUserAuthenticated()) {
      this.cmdService.checkNoCurrent().subscribe({
        error: () => {
          const navigationExtras: NavigationExtras = {state: {data: "Vous avez déjà une commande en cours. Veuillez l'annuler ou la poursuivre pour effectuer une autre commande."}};
          this.router.navigate(['/paiement', 'cb'], navigationExtras);
        }
      });
    }
    this.getTotal();
    this.nombreArticles();
    this.prdsInCart = this.getAllInCart();
  }

  getTotal(): number {
    this.total = this.panierService.getTotalPanier();
    return this.total;
  }

  nombreArticles(): number { 
    this.qteTotal = this.panierService.nombreArticlesPanier();
    return this.qteTotal;
  }

  getQteByProduit(idProd: number): number { 
    let q = this.panierService.getQteByProduit(idProd);
    return q;
  }

  removeProduct(id: number): void {
    this.panierService.removeProduct(id);
    this.ngOnInit();
  }

  updateQte(id: number) : void {
    this.panierService.updateQte(id);
    this.ngOnInit();
  }

  getAllInCart(): Produit[] { 
    return this.panierService.getAllProductsInCart();
  }

  validePanier(): void {
    if(!this.authService.isUserAuthenticated()) {
      this.alert = "Connectez-vous pour finaliser la commande.";
      this.modalService.open("modal-panieralert");
    } else if(!this.authService.isClient()) {
      this.alert = "Vous devez utiliser un compte client.";
      this.modalService.open("modal-panieralert");
    } else {
      this.router.navigate(['/recapitulatif']);
    }
  }

  closeModal(): void {
    this.alert = "";
    this.modalService.close("modal-panieralert");
    this.router.navigate(["login"]);
  }
}