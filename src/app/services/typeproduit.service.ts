import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TypeProduit } from '../models/TypeProduit.model';

@Injectable({
  providedIn: 'root'
})
export class TypeproduitService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TypeProduit[]> {
    return this.http.get<TypeProduit[]>("http://localhost:8080/type-produit");
  }

  getAllForAdmin(): Observable<TypeProduit[]> {
    return this.http.get<TypeProduit[]>("http://localhost:8080/type-produit/all-with-id");
  }

  add(form: FormGroup): Observable<TypeProduit> {
    return this.http.post<TypeProduit>("http://localhost:8080/type-produit/create", {
      label: form.get("label")?.value
    });
  }

  update(tp: TypeProduit, form: FormGroup): Observable<TypeProduit> {
    return this.http.put<TypeProduit>("http://localhost:8080/type-produit/" + tp.id, {
      label: form.get("label")?.value
    });
  }

  delete(tp: TypeProduit): Observable<void> {
    return this.http.delete<void>("http://localhost:8080/type-produit/" + tp.id);
  }
}
