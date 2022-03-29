import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { TypeProduit } from 'src/app/models/TypeProduit.model';
import { PanierService } from 'src/app/services/panier.service';
import { TypeproduitService } from 'src/app/services/typeproduit.service';
import DataJson from 'src/assets/jsonfixtures/data.json';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser!: User;
  tp!: TypeProduit[];
  user: any;
  cart: Map<any, number> = new Map();
  qteTotal:number = 0;

  constructor(
    private authService: AuthService, 
    private tpService: TypeproduitService, 
    private router: Router, 
    private panierService: PanierService) {  
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe({
      next: u => {
        this.currentUser = u;
      }
    });
    this.authService.updateHeader();
    this.tpService.getAll().subscribe({
      next: t => {
        this.tp = t;
      }
    });
    this.panierService.qteTotal.subscribe({
      next: q => {
        this.qteTotal = q;
      }
    });
    this.panierService.updateHeader();
  }

  isHomeRoute() {
    return this.router.url === '/' || '';
  }

  logout(): void {
    this.authService.logout();
    this.panierService.empty();
    const navigationExtras: NavigationExtras = { state: { data: "Vous avez été déconnecté avec succès !" } };
    this.router.navigate(['/'], navigationExtras);
  }

}
