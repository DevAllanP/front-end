import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../auth/models/user.model';
import { Adresse } from '../models/Adresse.model';
import { Role } from '../models/Role.model';
import { Utilisateur } from '../models/Utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  currentUser: any;
  router: any;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>("http://localhost:8080/users");
  }

  getById(id : Number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>("http://localhost:8080/users/id:" + id);
  }

  getByMail(mail : String): Observable<Utilisateur> {
    return this.http.get<Utilisateur>("http://localhost:8080/users/mail:" + mail);
  }

  getByNom(nom : String): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>("http://localhost:8080/users/nom:" + nom);
  }

  cree(form: FormGroup): Observable<Utilisateur> {
    return this.http.post<Utilisateur>("http://localhost:8080/users/create", {
      "nom": form.get("nom")!.value, 
      "prenom": form.get("prenom")!.value, 
      "email": form.get("email")!.value, 
      "password": form.get("password")!.value,
      "dateNaissance": form.get("dateNaissance")!.value, 
      "roleId": form.get("roleId")!.value
    })
  }

  update(form: FormGroup) : Observable<Utilisateur>{
    return this.http.put<Utilisateur>("http://localhost:8080/users/update", {
      email: form.get("email")?.value,
      adresse: {
        numero : form.get("numero")?.value,
        rue: form.get("rue")?.value,
        ville: form.get("ville")?.value,
        codePostal: form.get("codepostal")?.value
      } 
    })
  }

  updateMdp(form: FormGroup) : Observable<Utilisateur>{
    return this.http.put<Utilisateur>("http://localhost:8080/users/updateMdp", {
        oldPassword: form.get("oldPassword")?.value,
       password : form.get("password")?.value, 
    })
  }


  updateDisable(form: FormGroup) : Observable<Utilisateur>{
    return this.http.put<Utilisateur>("http://localhost:8080/users/updateDisable", {
        password: form.get("password")?.value,
        disable: form.get("disable")?.value,

    })
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>("http://localhost:8080/roles");
  }

  updateAddress(form: FormGroup): Observable<Adresse> {
    return this.http.put<Adresse>("http://localhost:8080/adresses", {
      numero: form.get("numero")?.value,
      rue: form.get("rue")?.value,
      codePostal: form.get("codePostal")?.value,
      ville: form.get("ville")?.value
    });
  }

  inscrit(form: FormGroup): Observable<User> {
    return this.http.post<User>("http://localhost:8080/users/signup", {
      nom: form.get("nom")?.value,
      prenom: form.get("prenom")?.value,
      dateNaissance: form.get("ddn")?.value,
      email: form.get("email")?.value,
      password: form.get("password1")?.value
    });
  }

  updateById(id: number, form: FormGroup): Observable<Utilisateur> {
    return this.http.put<Utilisateur>("http://localhost:8080/users/" + id, {
      nom: form.get("nom")?.value,
      prenom: form.get("prenom")?.value,
      dateNaissance: form.get("dateNaissance")?.value,
      email: form.get("email")?.value,
      password: form.get("password")?.value,
      role: {
        id: form.get("roleId")?.value
      }
    })
  }

  getAllWithId(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>("http://localhost:8080/users/all-with-id");
  }

  disable(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/users/"+id+"/disable");
  }

  contactClient(id: number, form: FormGroup): Observable<any> {
    return this.http.post<any>("http://localhost:8080/users/"+id+"/contact", {
      sujet: form.get("sujet")?.value,
      message: form.get("message")?.value
    });
  }
}