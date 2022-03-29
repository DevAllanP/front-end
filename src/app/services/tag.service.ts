import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from '../models/Tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>("http://localhost:8080/tag");
  }

  getAllForAdmin(): Observable<Tag[]> {
    return this.http.get<Tag[]>("http://localhost:8080/tag/all-with-id");
  }

  add(form: FormGroup): Observable<Tag> {
    return this.http.post<Tag>("http://localhost:8080/tag/create", {
      label: form.get("label")?.value
    });
  }

  update(tag: Tag, form: FormGroup): Observable<Tag> {
    return this.http.put<Tag>("http://localhost:8080/tag/" + tag.id, {
      label: form.get("label")?.value
    });
  }

  delete(tag: Tag): Observable<void> {
    return this.http.delete<void>("http://localhost:8080/tag/" + tag.id);
  }

  getAllByType(type: string): Observable<Tag[]> {
    return this.http.get<Tag[]>("http://localhost:8080/tag/type/" + type);
  }
}