import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/Produit.model';
import { ModalService } from 'src/app/services/modal.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-produitliste',
  templateUrl: './produitliste.component.html',
  styleUrls: ['./produitliste.component.css']
})
export class ProduitlisteComponent implements OnInit {
  produits!: Produit[];
  alert: string = "";

  constructor(private produitsService: ProduitsService, private router: Router, private modalService: ModalService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: string };
    if(state)
      this.alert = state ? state.data : "";
  }

  ngAfterViewChecked(): void {
    if(this.alert)
      this.modalService.open("modal-produitliste");
  }

  closeModal(): void {
    this.alert = "";
    this.modalService.close("modal-produitliste");
  }

  ngOnInit(): void {
    this.rechargeProduits();
  }

  rechargeProduits(): void {
    this.produitsService.findAll().subscribe({
      next: p => {
        this.produits = p;
      }
    });
  }

  modifie(produit: Produit): void {
    this.router.navigate(['/commercial/produit/edition', produit.idProduit]);
  }

  desactive(produit: Produit): void {
    if(confirm("Êtes-vous sûr de vouloir désactiver " + produit.nom + " ?")) {
      this.produitsService.desactive(produit).subscribe({
        next: () => {
          this.rechargeProduits();
        }
      });
    }
  }
}