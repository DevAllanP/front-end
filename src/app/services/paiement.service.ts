import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  

  constructor(private http: HttpClient) { }

  getOrder():Observable<Produit>{
    return this.http.get<Produit>("http://localhost:8080/paiement/orderForm");
  }

  cree(form: FormGroup): Observable<Produit> {
    return this.http.post<Produit>("http://localhost:8080/paiement/orderForm", {
      nom: form.get("nom")?.value,
      prix: form.get("prix")?.value,
      price: form.get("price")?.value
    })
  }
}
