import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/contact/types");
  }

  send(form: FormGroup): Observable<any> {
    return this.http.post<any>("http://localhost:8080/contact", {
      type: form.get("type")?.value,
      objet: form.get("objet")?.value,
      message: form.get("message")?.value
    });
  }
}
