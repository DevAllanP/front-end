import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/Produit.model';
import { ModalService } from 'src/app/services/modal.service';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  alert: string = "";
  produit?: Produit;
  products: Produit[] = new Array(); 

  constructor(private router: Router, private produitService: ProduitsService, private modalService: ModalService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: string };
    if(state)
      this.alert = state ? state.data : ""; 
  }

  ngAfterViewChecked(): void {
    if(this.alert)
      this.modalService.open("modal-home");
  }

  ngOnInit(): void {
    this.getNewProduit(21);
    this.getHomeProduits(21, 22, 23);
  }

  closeModal(): void {
    this.alert = "";
    this.modalService.close("modal-home");
  }

  getNewProduit(id:number) : void { 
    this.produitService.getById(id).subscribe( 
      p => {
        this.produit = new Produit(p.idProduit, false, p.nom, p.description, p.prix, p.tagDtos, p.typeProduitDto, new Array());
        this.produitService.setImages(this.produit);
    })
  }

  getHomeProduits(...ids:number[]): void {
    ids.forEach( id => { 
      let prd;
      this.produitService.getById(id).subscribe( p => {
        prd = new Produit(p.idProduit, false, p.nom, p.description, p.prix, p.tagDtos, p.typeProduitDto, new Array());
        this.produitService.setImages(prd);
        this.products.push(prd);
      });
    })
  }

  

}
