import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Adresse } from "../models/Adresse.model";
import { LibraryConfig } from "./models/config";
import { User } from "./models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentUser = new BehaviorSubject({} as User);

  constructor(private http: HttpClient,
    private router: Router,
    @Inject('config') private config: LibraryConfig) { }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.config.authEndpoint, {
        email: user.email,
        password: user.password
      })
      .pipe(
        map(user => {
          this.storeUser(user);
          return user;
        })
      );
  }

  storeUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
    this.updateHeader();
  }

  updateHeader(): void {
    this.currentUser.next(this.getLoggedUser());
  }

  logout(): void {
    localStorage.removeItem("user");
    this.updateHeader();
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });;
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem("user") || '{}');
  }

  isClient(): boolean {
    return this.isUserAuthenticated() && this.getLoggedUser().roleLabel === "ROLE_CLIENT";
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("user");
  }

  updateAddress(adresse: Adresse): void {
    let usr: User = this.getLoggedUser();
    usr.adresse = adresse;
    localStorage.setItem("user", JSON.stringify(usr));
    this.updateHeader();
  }
}
