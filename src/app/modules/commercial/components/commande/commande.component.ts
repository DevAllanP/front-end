import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande } from 'src/app/models/Commande.model';
import { LigneCommande } from 'src/app/models/LigneCommande.model';
import { StatusCommande } from 'src/app/models/StatusCommande.model';
import { CommandesService } from 'src/app/services/commandes.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  @Input() commande!: Commande;
  @Input() allStatus!: StatusCommande[];
  currentStatusId!: number;
  statusForm: FormGroup;
  lignes!: LigneCommande[];
  total: number = 0;
  showContact: boolean = false;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private cmdService: CommandesService, private modalService: ModalService) {
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });
    this.contactForm = this.fb.group({
      objet: ['', Validators.required],
      corps: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.allStatus && this.commande) {
      this.allStatus.forEach(s => {
        if(s.label === this.commande.statusDeCommande.label) {
          this.currentStatusId = s.id;
          this.statusForm.setValue({
            status: s.id
          });
        }
      });
      this.cmdService.getLines(this.commande.id).subscribe({
        next: l => {
          this.lignes = l;
          this.total = 0;
          l.forEach(ligne => { this.total += ligne.prixUnitaire * ligne.quantite; });
          this.commande.listFrais.forEach(frais => { this.total += frais.montant; });
        }
      });
    }
  }

  contacte(): void {
    this.showContact = !this.showContact;
  }

  onSubmitStatus(): void {
    if(this.currentStatusId === this.statusForm.get("status")?.value) {
      alert("Pas de changement dans le status.");
    } else if(confirm("Le client sera notifié de ce changement. Voulez-vous vraiment changer le status de la commande ?")) {
      this.cmdService.changeStatus(this.commande.id, this.statusForm).subscribe({
        next: c => {
          this.commande = c;
          this.currentStatusId = this.statusForm.get("status")?.value;
          alert("Le changement de status a été effectué !");
        }
      });
    }
  }

  onSubmitContact(): void {
    this.modalService.open("modal-commande-"+this.commande.id+"-loading");
    this.cmdService.contacte(this.commande.id, this.contactForm).subscribe({
      next: () => {
        this.modalService.close("modal-commande-"+this.commande.id+"-loading");
        this.modalService.open("modal-commande-"+this.commande.id+"-contact");
        this.showContact = false;
      }
    });
  }

  closeContactModal(): void {
    this.modalService.close("modal-commande-"+this.commande.id+"-contact");
  }

}
