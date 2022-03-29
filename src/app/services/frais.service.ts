import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Frais } from '../models/Frais.model';
import { LigneCommande } from '../models/LigneCommande.model';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Frais[]> {
    return this.http.get<Frais[]>("http://localhost:8080/frais");
  }

  getAllForAdmin(): Observable<Frais[]> {
    return this.http.get<Frais[]>("http://localhost:8080/frais/all-with-id");
  }

  add(form: FormGroup): Observable<Frais> {
    return this.http.post<Frais>("http://localhost:8080/frais/create", {
      label: form.get("label")?.value,
      montant: form.get("montant")?.value
    });
  }

  update(frais: Frais, form: FormGroup): Observable<Frais> {
    return this.http.put<Frais>("http://localhost:8080/frais/" + frais.id, {
      label: form.get("label")?.value,
      montant: form.get("montant")?.value
    });
  }

  getFromCart(lignes: any[]): Observable<Frais[]> {
    return this.http.post<Frais[]>("http://localhost:8080/frais/cart", lignes);
  }
}