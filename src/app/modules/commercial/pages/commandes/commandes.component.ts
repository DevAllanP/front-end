import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande } from 'src/app/models/Commande.model';
import { StatusCommande } from 'src/app/models/StatusCommande.model';
import { CommandesService } from 'src/app/services/commandes.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  rechercheForm: FormGroup;
  status!: StatusCommande[];
  commandes!: Commande[];
  filtreParStatus: string = "";

  constructor(private fb: FormBuilder, private cmdService: CommandesService) {
    this.rechercheForm = this.fb.group({
      num: ['']
    });
  }

  ngOnInit(): void {
    this.cmdService.getAllStatusWithId().subscribe({
      next: s => {
        this.status = s;
      }
    });
    this.rechargeCmd();
  }

  rechargeCmd(): void {
    this.cmdService.getAllWithId(this.filtreParStatus).subscribe({
      next: c => {
        this.commandes = c;
      }
    });
  }

  onFiltre(ev: Event): void {
    this.filtreParStatus = (<HTMLSelectElement>ev.target).value;
    this.rechargeCmd();
  }

  onRecherche(): void {
    if(this.rechercheForm.get("num")?.value) {
      this.cmdService.getByIdWithId(this.rechercheForm.get("num")?.value).subscribe({
        next: c => {
          this.commandes = [c];
        }
      });
    } else {
      this.rechargeCmd();
    }
  }

}
