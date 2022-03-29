import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commercial',
  templateUrl: './commercial.component.html',
  styleUrls: ['./commercial.component.css']
})
export class CommercialComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.navigate(["commercial/commandes"]);
  }
}