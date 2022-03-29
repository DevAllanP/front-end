import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Commande } from 'src/app/models/Commande.model';
import { LigneCommande } from 'src/app/models/LigneCommande.model';
import { CommandesService } from 'src/app/services/commandes.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit, AfterViewChecked {
  tab: string = "cb";
  commande!: Commande;
  lignes!: LigneCommande[];
  total: number = 0;
  quantiteTotal: number = 0;
  sousTotal: number = 0;
  cbForm: FormGroup;
  alert: string = "";

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cmdService: CommandesService, private fb: FormBuilder, private modalService: ModalService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { data: string };
    if(state)
      this.alert = state ? state.data : "";
    this.cbForm = this.fb.group({
      nom: ['', Validators.required],
      num: ['', Validators.required],
      exp: ['', Validators.required],
      sec: ['', Validators.required]
    });
  }

  ngAfterViewChecked(): void {
    if(this.alert)
      this.modalService.open("modal-paiementalert");
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: params => {
        this.tab = params["type"];
        if(this.tab !== "cb" && this.tab !== "stripe")
          this.router.navigate(["/"]);
      }
    });
    this.cmdService.getCurrent().subscribe({
      next: c => {
        this.commande = c;
        this.calculateTotal();
      },
      error: () => {
        this.router.navigate(["/"]);
      }
    });
    this.getLines();
  }

  getLines(): void {
    this.cmdService.getCurrentLines().subscribe({
      next: l => {
        this.lignes = l;
        this.calculateTotal();
      }
    });
  }

  calculateTotal(): void {
    if(this.commande && this.lignes) {
      this.total = 0;
      this.quantiteTotal = 0;
      this.lignes.forEach(l => {
        this.total += l.prixUnitaire * l.quantite;
        this.quantiteTotal += l.quantite;
      });
      this.sousTotal = this.total;
      this.commande.listFrais.forEach(f => {
        this.total += f.montant;
      });
    }
  }

  changeTab(id: string) {
    this.tab = id;
  }

  onSubmitCb(): void {
    this.modalService.open("modal-paiementloading");
    this.cmdService.paieParCb(this.cbForm).subscribe({
      next: c => {
        const navigationExtras: NavigationExtras = {state: {data: "Votre commande a été passée ! Un e-mail vous a été envoyé !"}};
        this.modalService.close("modal-paiementloading");
        this.router.navigate(['/'], navigationExtras);
      }
    });
  }

  annule(): void {
    this.modalService.open("modal-paiementannulation");
  }

  doAnnule(): void {
    this.modalService.close("modal-paiementannulation");
    this.modalService.open("modal-paiementloading");
    this.cmdService.annule().subscribe({
      next: () => {
        const navigationExtras: NavigationExtras = {state: {data: "Votre commande a été annulée !"}};
        this.modalService.close("modal-paiementloading");
        this.router.navigate(['/'], navigationExtras);
      }
    });
  }

  closeModal(id: string): void {
    this.alert = "";
    this.modalService.close(id);
  }
}