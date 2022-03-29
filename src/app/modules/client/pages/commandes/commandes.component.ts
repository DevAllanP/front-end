import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/Commande.model';
import { CommandesService } from 'src/app/services/commandes.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandes!: Commande[];

  constructor(private cmdService: CommandesService) { }

  ngOnInit(): void {
    this.cmdService.getMines().subscribe({
      next: c => {
        this.commandes = c;
      }
    });
  }
}