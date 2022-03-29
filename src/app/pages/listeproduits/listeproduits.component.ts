import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/models/Produit.model';
import { Tag } from 'src/app/models/Tag.model';
import { ProduitsService } from 'src/app/services/produits.service';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-listeproduits',
  templateUrl: './listeproduits.component.html',
  styleUrls: ['./listeproduits.component.css']
})
export class ListeproduitsComponent implements OnInit {
  produits!: Produit[];
  tags!: Tag[];
  triForm: FormGroup;
  prixForm: FormGroup;
  type: string = "";
  filtreActif: boolean = false;
  filtreErreur: boolean = false;
  tagActif: string = "";

  constructor(private activatedRoute: ActivatedRoute, private produitsService: ProduitsService, private fb: FormBuilder, private tagService: TagService) {
    this.triForm = this.fb.group({
      tri: ['croissant', Validators.required]
    });
    this.prixForm = this.fb.group({
      min: [],
      max: []
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: params => {
        this.tagActif = "";
        this.type = params['label'];
        this.rechargeTags();
        this.rechargeProduits();
      }
    });
  }

  rechargeTags(): void {
    if(this.type) {
      this.tagService.getAllByType(this.type).subscribe({
        next: t => {
          this.tags = t;
          this.activatedRoute.queryParams.subscribe({
            next: params => {
              if(params["tag"]) {
                for(let i = 0; i < this.tags.length; i++) {
                  if(this.tags[i].label === params["tag"]) {
                    this.tagActif = params["tag"];
                    this.rechargeProduits();
                    break;
                  }
                }
              }
            }
          });
        }
      });
    }
  }

  rechargeProduits(): void {
    if(this.type) {
      this.produitsService.getByType(this.type, this.triForm.get("tri")?.value === "croissant", this.filtreActif ? this.prixForm : null, this.tagActif).subscribe({
        next: p => {
          this.produits = p;
        }
      });
    }
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

  selectionneParTag(event: Event, label: string): void {
    this.tagActif = label === this.tagActif ? "" : label;
    this.rechargeProduits();
  }
}