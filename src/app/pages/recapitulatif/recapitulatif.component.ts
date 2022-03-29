import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Adresse } from 'src/app/models/Adresse.model';
import { Frais } from 'src/app/models/Frais.model';
import { Produit } from 'src/app/models/Produit.model';
import { CommandesService } from 'src/app/services/commandes.service';
import { FraisService } from 'src/app/services/frais.service';
import { ModalService } from 'src/app/services/modal.service';
import { PanierService } from 'src/app/services/panier.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.css']
})
export class RecapitulatifComponent implements OnInit {
  total: number = 0;
  qteTotal:number = 0;
  prdsInCart: Produit[] = [];
  adresse?: Adresse;
  modePaiement: FormGroup;
  frais!: Frais[];
  totalWithFrais: number = 0;
  adresseForm: FormGroup;

  constructor(
    private authService: AuthService,
    private panierService: PanierService,
    private modalService: ModalService,
    private router: Router,
    private fb: FormBuilder,
    private fraisService: FraisService,
    private usrService: UtilisateurService,
    private cmdService: CommandesService
  ) {
    this.modePaiement = this.fb.group({
      mode: ['cb', Validators.required]
    });
    this.adresseForm = this.fb.group({
      numero: ['', Validators.required],
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cmdService.checkNoCurrent().subscribe({
      error: () => {
        const navigationExtras: NavigationExtras = {state: {data: "Vous avez déjà une commande en cours. Veuillez l'annuler ou la poursuivre pour effectuer une autre commande."}};
        this.router.navigate(['/paiement', 'cb'], navigationExtras);
      }
    });
    this.getTotal();
    this.nombreArticles();
    this.prdsInCart = this.getAllInCart();
    if(this.qteTotal < 1) {
      this.router.navigate(["/"]);
    }
    this.adresse = this.authService.getLoggedUser().adresse;
    this.fraisService.getFromCart(this.getLinesFromCart()).subscribe({
      next: f => {
        this.frais = f;
        this.totalWithFrais = this.total;
        this.frais.forEach(f => {
          this.totalWithFrais += f.montant;
        });
      }
    });
  }

  getLinesFromCart(): any[] {
    let lines: any[] = [];
    this.prdsInCart.forEach(p => {
      lines.push({idProduit: p._idProduit, quantite: this.getQteByProduit(p._idProduit)});
    });
    return lines;
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

  getAllInCart(): Produit[] { 
    return this.panierService.getAllProductsInCart();
  }

  onSubmitAdresse(): void {
    this.usrService.updateAddress(this.adresseForm).subscribe({
      next: a => {
        this.adresse = a;
        this.authService.updateAddress(a);
      }
    });
  }

  modifieAdresse(): void {
    let adresse = this.authService.getLoggedUser().adresse;
    this.adresse = undefined;
    this.adresseForm.setValue({
      numero: adresse.numero,
      rue: adresse.rue,
      codePostal: adresse.codePostal,
      ville: adresse.ville
    });
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  paie(): void {
    if(!this.adresse) {
      this.modalService.open("modal-recapadresse");
    } else if(!this.frais) {
      this.modalService.open("modal-recapfrais");
    } else {
      this.cmdService.create(this.getLinesFromCart()).subscribe({
        next: c => {
          this.panierService.empty();
          this.router.navigate(['/paiement', this.modePaiement.get("mode")?.value]);
        }
      });
    }
  }
}