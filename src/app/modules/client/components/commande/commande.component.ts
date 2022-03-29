import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande } from 'src/app/models/Commande.model';
import { LigneCommande } from 'src/app/models/LigneCommande.model';
import { CommandesService } from 'src/app/services/commandes.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  @Input() commande!: Commande;
  lignes!: LigneCommande[];
  total: number = 0;
  showContact: boolean = false;
  contactForm: FormGroup;
  showSuivi: boolean = false;

  constructor(private fb: FormBuilder, private cmdService: CommandesService, private modalService: ModalService) {
    this.contactForm = this.fb.group({
      justification: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.commande) {
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
    this.showSuivi = false;
    this.showContact = !this.showContact;
  }

  suit(): void {
    this.showContact = false;
    this.showSuivi = !this.showSuivi;
  }

  onSubmitContact(): void {
    this.modalService.open("modal-commande-"+this.commande.id+"-loading");
    this.cmdService.retourne(this.commande.id, this.contactForm).subscribe({
      next: c => {
        this.commande = c;
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