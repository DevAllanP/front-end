import { Component, Input, OnInit } from '@angular/core';
import { Produit } from 'src/app/models/Produit.model';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() produit!: Produit;
  @Input() quantite: number = 0;

  constructor(private produitService: ProduitsService) { }

  ngOnInit(): void {
      this.produit = new Produit(this.produit.idProduit, false, this.produit.nom, this.produit.description, this.produit.prix, this.produit.tagDtos, this.produit.typeProduitDto, new Array());
      this.produitService.setImages(this.produit);
  }

}
