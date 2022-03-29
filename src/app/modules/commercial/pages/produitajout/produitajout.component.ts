import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { TypeProduit } from 'src/app/models/TypeProduit.model';
import { ProduitsService } from 'src/app/services/produits.service';
import { TypeproduitService } from 'src/app/services/typeproduit.service';

@Component({
  selector: 'app-produitajout',
  templateUrl: './produitajout.component.html',
  styleUrls: ['./produitajout.component.css']
})
export class ProduitajoutComponent implements OnInit {
  addForm: FormGroup;
  types!: TypeProduit[];

  constructor(private fb: FormBuilder, private tpService: TypeproduitService, private produitService: ProduitsService, private router: Router) {
    this.addForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      tags: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tpService.getAllForAdmin().subscribe({
      next: t => {
        this.types = t;
      }
    });
  }

  onSubmit(): void {
    if(this.types && this.types.length) {
      let currentType: TypeProduit = this.types[0];
      for(let i = 0; i < this.types.length; i++) {
        if(this.types[i].id === this.addForm.get("type")?.value) {
          currentType = this.types[i];
          break;
        }
      }
      this.produitService.ajoute(this.addForm, currentType).subscribe({
        next: p => {
          const navigationExtras: NavigationExtras = {state: {data: "Le produit a été ajouté ! Il a l'ID : " + p.idProduit}};
          this.router.navigate(['/commercial/produit/liste'], navigationExtras);
        }
      });
    }
  }

}
