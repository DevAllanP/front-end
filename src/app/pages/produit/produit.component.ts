import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { Produit } from 'src/app/models/Produit.model';
import { PanierService } from 'src/app/services/panier.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  @Input() id!: number;
  currentUser!: User;
  produit!: Produit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private produitsService: ProduitsService,
    private panierService: PanierService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: u => {
        this.currentUser = u;
      }
    });
    this.activatedRoute.params.subscribe({
      next: params => {
        this.id = params['id'];
        this.produitsService.getById(this.id).subscribe({
          next: produit => {
            this.produit = new Produit(produit.idProduit, false, produit.nom, produit.description, produit.prix, produit.tagDtos, produit.typeProduitDto, new Array());
            this.produitsService.setImages(this.produit);
          }
        })
      }
    });
  }

  addToCart(produit: Produit) {
    this.panierService.addToPanier(produit);
  }
}