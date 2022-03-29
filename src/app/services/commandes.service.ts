import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Commande } from '../models/Commande.model';
import { LigneCommande } from '../models/LigneCommande.model';
import { StatusCommande } from '../models/StatusCommande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  constructor(private http: HttpClient) { }

  getAllStatusWithId(): Observable<StatusCommande[]> {
    return this.http.get<StatusCommande[]>("http://localhost:8080/status-commande/all-with-id");
  }

  getAllWithId(id: string): Observable<Commande[]> {
    return this.http.get<Commande[]>("http://localhost:8080/commande/all-with-id?statusId=" + id);
  }

  changeStatus(idCommande: number, form: FormGroup): Observable<Commande> {
    return this.http.put<Commande>("http://localhost:8080/commande/status", {
      idCommande: idCommande,
      idStatus: form.get("status")?.value
    });
  }

  getLines(id: number): Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>("http://localhost:8080/ligne-commande/commande/"+id);
  }

  getByIdWithId(id: number): Observable<Commande> {
    return this.http.get<Commande>("http://localhost:8080/commande/" + id + "/with-id");
  }

  contacte(id:number, form: FormGroup): Observable<any> {
    return this.http.post<any>("http://localhost:8080/commande/contact", {
      idCommande: id,
      objet: form.get("objet")?.value,
      corps: form.get("corps")?.value
    });
  }

  create(lines: any[]): Observable<Commande> {
    return this.http.post<Commande>("http://localhost:8080/commande/new", lines);
  }

  getCurrent(): Observable<Commande> {
    return this.http.get<Commande>("http://localhost:8080/commande/current");
  }

  getCurrentLines(): Observable<LigneCommande[]> {
    return this.http.get<LigneCommande[]>("http://localhost:8080/ligne-commande/current");
  }

  paieParCb(form: FormGroup): Observable<Commande> {
    return this.http.put<Commande>("http://localhost:8080/commande/pay/cb", {
      titulaire: form.get("nom")?.value,
      numero: form.get("num")?.value,
      expiration: form.get("exp")?.value,
      codeSecret: form.get("sec")?.value
    });
  }

  annule(): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/commande/cancel");
  }

  getMines(): Observable<Commande[]> {
    return this.http.get<Commande[]>("http://localhost:8080/commande/me");
  }

  retourne(id: number, form: FormGroup): Observable<Commande> {
    return this.http.put<Commande>("http://localhost:8080/commande/return", {
      idCommande: id,
      justification: form.get("justification")?.value
    });
  }

  checkNoCurrent(): Observable<any> {
    return this.http.get<Commande>("http://localhost:8080/commande/checkNoCurrent");
  }
}
