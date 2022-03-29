import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produit } from '../models/Produit.model';
import { Tag } from '../models/Tag.model';
import { TypeProduit } from '../models/TypeProduit.model';
import DataJson from 'src/assets/jsonfixtures/images.json';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  productsImages = DataJson.imagesProduit;
  yourHeadersConfig:any;

  constructor(private http: HttpClient) { }

  getByType(type: string, asc: boolean, prix: FormGroup | null, tag: string): Observable<Produit[]> {
    let data = { ordre: asc ? "asc" : "desc", min: null, max: null, tag: tag || null };
    if(prix !== null) {
      if(prix.get("min")?.valid && prix.get("min")?.value !== null)
        data.min = prix.get("min")?.value;
      if(prix.get("max")?.valid && prix.get("max")?.value !== null)
        data.max = prix.get("max")?.value;
    }
    return this.http.post<Produit[]>("http://localhost:8080/produit/type/" + type, data);
  }

  getById(id : Number): Observable<Produit> {
    return this.http.get<Produit>("http://localhost:8080/produit/" + id);
  }

  ajoute(form: FormGroup, tp: TypeProduit): Observable<Produit> {
    let tags:Tag[] = [];
    (<string>form.get("tags")?.value).split(" ").forEach(t => {
      if (t)
        tags.push({label: t.toLowerCase()} as Tag);
    });
    return this.http.post<Produit>("http://localhost:8080/produit/create", {
      disable: false,
      nom: form.get("nom")?.value,
      description: form.get("description")?.value,
      prix: form.get("prix")?.value,
      tagDtos: tags,
      typeProduitDto: tp
    });
  }

  findAll(): Observable<Produit[]> {
    return this.http.get<Produit[]>("http://localhost:8080/produit");
  }

  desactive(produit: Produit): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/produit/"+produit.idProduit+"/disable");
  }

  modifie(id: number, form: FormGroup, tp: TypeProduit): Observable<Produit> {
    let tags:Tag[] = [];
    (<string>form.get("tags")?.value).split(" ").forEach(t => {
      if (t)
        tags.push({label: t.toLowerCase()} as Tag);
    });
    return this.http.put<Produit>("http://localhost:8080/produit/" + id, {
      disable: false,
      nom: form.get("nom")?.value,
      description: form.get("description")?.value,
      prix: form.get("prix")?.value,
      tagDtos: tags,
      typeProduitDto: tp
    });
  }

  recherche(req: string, asc: boolean, prix: FormGroup | null): Observable<Produit[]> {
    let data = {
      recherche: req,
      ordre: asc ? "asc" : "desc",
      min: null,
      max: null
    };
    if(prix !== null) {
      if(prix.get("min")?.valid && prix.get("min")?.value !== null)
        data.min = prix.get("min")?.value;
        if(prix.get("max")?.valid && prix.get("max")?.value !== null)
          data.max = prix.get("max")?.value;
    }
    return this.http.post<Produit[]>("http://localhost:8080/produit/search", data);
  }

  setImages(produit: Produit): void {   
    this.productsImages.forEach( o => {
        if(o.pid == produit.idProduit) {
          produit.url_images?.push(...o.images);
      }
    });
  }

  addImage(produit:Produit, url:string): void {
    produit.url_images.push(url);
    let urlImages: string[] =  produit.url_images;
    this.productsImages.forEach( o => {
      if(o.pid == produit.idProduit) {
        o.images.push(url);
      }
    })
    //this.productsImages.push({ pid:produit.idProduit, images:urlImages});

    console.log(this.productsImages);
  }

}