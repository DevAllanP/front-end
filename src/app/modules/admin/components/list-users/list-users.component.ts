import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { ModalService } from 'src/app/services/modal.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  byMailForm:FormGroup;
  byNameForm:FormGroup;
  byIdForm:FormGroup;
  users! : Utilisateur[];
  usrContact!: Utilisateur;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private service: UtilisateurService, private modalService: ModalService) { 
    this.byMailForm = this.fb.group({
      userbymail: ['', Validators.required]
    });
    this.byNameForm = this.fb.group({
      userbynom: ['', Validators.required]
    });
    this.byIdForm = this.fb.group({
      userbyid: ['', Validators.required]
    });
    this.contactForm = this.fb.group({
      sujet: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.service.getAllWithId().subscribe({
      next: (utilisateurs: Utilisateur[]) => {
        this.users = utilisateurs;
      }
    });
  }

  ngOnInit(): void { }

  searchById(): void {
    if(this.byIdForm.get("userbyid")?.valid) {
      //this.router.navigate(['users', this.byIdForm.get("user")!.value]);
      console.log(this.byIdForm.get("userbyid")!.value);
      this.service.getById(Number(this.byIdForm.get("userbyid")!.value)).subscribe({
        next: u => {
          this.users = [];
          this.users.push(u);
        }
      });
    }
  }

  searchByMail(): void {
    if(this.byMailForm.get("userbymail")?.valid) {
      console.log(this.byMailForm.get("userbymail")!.value);
      this.service.getByMail(this.byMailForm.get("userbymail")!.value).subscribe({
        next: u => {
          this.users = [];
          this.users.push(u);
        }
      });
    }
  }

  searchByName(): void {
    if(this.byNameForm.get("userbynom")?.valid) {
      this.users = [];
      this.service.getByNom(this.byNameForm.get("userbynom")!.value).subscribe({
        next: (utilisateurs: Utilisateur[]) => {
         this.users = utilisateurs;
        }
      });
    }
  }

  disable(usr: Utilisateur): void {
    if(confirm("Êtes-vous bien sûr de vouloir désactiver l'utilisateur "+usr.email+" ?")) {
      this.modalService.open("modal-adminloading");
      this.service.disable(usr.id.valueOf()).subscribe(() => {
        this.modalService.close("modal-adminloading");
        window.location.reload();
      });
    }
  }

  contact(usr: Utilisateur): void {
    this.usrContact = usr;
    this.modalService.open("modal-contactclient");
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  onSendMessage(): void {
    this.modalService.close("modal-contactclient");
    this.modalService.open("modal-adminloading");
    this.service.contactClient(this.usrContact.id.valueOf(), this.contactForm).subscribe(() => {
      this.modalService.close("modal-adminloading");
      this.modalService.open("modal-contactclientok");
    });
  }
}
