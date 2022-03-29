import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Produit } from '../models/Produit.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  productsInCart:Produit[] = [];
  qteInCart:{"idProd": number, "qte": number}[] =[];
  qteTotal = new BehaviorSubject(0);

  constructor(private router: Router){
    if( localStorage['produits']) {
      this.productsInCart = JSON.parse(localStorage['produits'] || "[]");
    }
    if(localStorage['quantites'] ){
      this.qteInCart= JSON.parse(localStorage['quantites'] || "[]");
    }
    localStorage.setItem("produits", JSON.stringify(Array.from(this.productsInCart)));
    localStorage.setItem("quantites", JSON.stringify(Array.from(this.qteInCart))); 
  }

  addToPanier(produit: Produit): void {
    let inCart = false;
    if(localStorage['produits']) {
      this.productsInCart = JSON.parse(localStorage['produits'] || "[]");
    }
    if(localStorage['quantites']){
      this.qteInCart = JSON.parse(localStorage['quantites'] || "[]");
    }   
    this.qteInCart.forEach( (o, index) => {
      if(produit.idProduit == o.idProd) {
        inCart = true;
        o.qte++;
      }
    })
    if( !inCart) {
      this.qteInCart.push({idProd: produit.idProduit, qte:1});
      this.productsInCart.push(produit);
    }
    localStorage.removeItem("produits");
    localStorage.removeItem("quantites");
    localStorage.setItem("produits", JSON.stringify(this.productsInCart));
    localStorage.setItem("quantites", JSON.stringify(this.qteInCart));
    this.updateHeader();
    this.router.navigate(['/panier']);  
  }

  getTotalPanier(): number { 
    let total= 0;
    this.productsInCart.forEach( prd => {
      this.qteInCart.forEach( o => {
        if(o.idProd === prd._idProduit) {
          const value = o.qte;
          total += prd._prix * value;
        }
      })
    }); 
    return total;
  }

  nombreArticlesPanier(): number { 
    let qteTotal = 0;
    this.qteInCart.forEach( o => {
      const value = o.qte;
       qteTotal += value;
    });
    return qteTotal;
  }

  getQteByProduit(idProd: number): number { 
    let q = 0;
      this.qteInCart.forEach( o => {
        if(o.idProd == idProd) {
          q =o.qte;
        }
      })
    return q;
  }

  removeProduct(id: number): void {
    localStorage.removeItem("produits");
    localStorage.removeItem("quantites");
    this.productsInCart.forEach( (p, index) => {
      if(p._idProduit == id) {
        this.productsInCart.splice(index, 1);
      }
      this.qteInCart.forEach( (o, ind) => {
        if(id == o.idProd) {
          this.qteInCart.splice(ind , 1);
        }
      })
    });  
    localStorage.setItem("produits", JSON.stringify(Array.from(this.productsInCart)));
    localStorage.setItem("quantites", JSON.stringify(Array.from(this.qteInCart)));
  }

  updateQte(id: number): void {
    localStorage.removeItem("quantites");
    let value = (<HTMLInputElement> document.getElementById("qte-"+id)).value;
    this.qteInCart.forEach( (o, index) => {
      if(o.idProd == id) {
        o.qte = Number.parseInt(value);
        if (o.qte == 0){
          this.productsInCart.forEach( (p, ind) => {
            if(p._idProduit == id) {
              this.productsInCart.splice(ind , 1);
            }
          })
          this.qteInCart.splice(index , 1);
        } 
      }
    });   
    localStorage.setItem("produits", JSON.stringify(Array.from(this.productsInCart)));
    localStorage.setItem("quantites", JSON.stringify(Array.from(this.qteInCart)));
    this.updateHeader();
  }

  getAllProductsInCart(): Array<Produit> {
    this.productsInCart = JSON.parse(localStorage['produits'] || "[]");
    return this.productsInCart;
  }

  empty(): void {
    localStorage.removeItem("produits");
    localStorage.removeItem("quantites");
    this.qteInCart.length = 0;
    this.productsInCart.length = 0;
    this.updateHeader();
  }

  updateHeader(): void {
    this.qteTotal.next(this.nombreArticlesPanier());
  }
}