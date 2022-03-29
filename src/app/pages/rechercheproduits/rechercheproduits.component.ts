import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/models/Produit.model';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-rechercheproduits',
  templateUrl: './rechercheproduits.component.html',
  styleUrls: ['./rechercheproduits.component.css']
})
export class RechercheproduitsComponent implements OnInit {
  produits!: Produit[];
  triForm: FormGroup;
  prixForm: FormGroup;
  req: string = "";
  filtreActif: boolean = false;
  filtreErreur: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private produitsService: ProduitsService, private fb: FormBuilder) {
    this.triForm = this.fb.group({
      tri: ['croissant', Validators.required]
    });
    this.prixForm = this.fb.group({
      min: [],
      max: []
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        this.req = params['req'];
        this.rechargeProduits();
      }
    });
  }

  changeTri(): void {
    this.rechargeProduits();
  }

  submitPrix(): void {
    if(this.prixForm.get("min")?.value === null && this.prixForm.get("max")?.value === null) {
      this.filtreErreur = true;
    } else {
      this.filtreErreur = false;
      this.filtreActif = true;
      this.rechargeProduits();
    }
  }

  annulePrix(): void {
    this.filtreActif = false;
    this.filtreErreur = false;
    this.rechargeProduits();
  }

  rechargeProduits(): void {
    if(this.req) {
      this.produitsService.recherche(this.req, this.triForm.get("tri")?.value === "croissant", this.filtreActif ? this.prixForm : null).subscribe({
        next: p => {
          this.produits = p;
        }
      });
    }
  }
}