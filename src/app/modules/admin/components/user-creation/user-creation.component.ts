import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/Role.model';
import { Utilisateur } from 'src/app/models/Utilisateur.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'],
})
export class UserCreationComponent implements OnInit {
  createUserForm: FormGroup;
  roles!: Role[];
  validatePasswordRequired: any;
  validateMinimumPassword: any;
  validatePasswordUpperCase: any;
  validatePasswordLowerCase: any;
  validatePasswordSpecialCharacter: any;
  validateOneNumber: any;
  utilisateur!: Utilisateur;
  utilisateurId!: number;

  constructor(
    private fb: FormBuilder,
    private service: UtilisateurService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.createUserForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      roleId: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: params => {
        if(params["id"]) {
          this.utilisateurId = params["id"];
          this.service.getById(params["id"]).subscribe(u => {
            this.utilisateur = u;
            this.createUserForm.setValue({
              nom: u.nom,
              prenom: u.prenom,
              email: u.email,
              password: '',
              dateNaissance: this.datePipe.transform(new Date(u.dateNaissance), 'yyyy-MM-dd'),
              roleId: u.role.id
            });
          });
        }
      }
    });
    this.service.getAllRoles().subscribe((r) => {
      this.roles = r;
    });
  }

  onSubmit(): void {
    if(this.utilisateur) {
      this.service.updateById(this.utilisateurId, this.createUserForm).subscribe(() => this.router.navigate(['admin', 'list']));
    } else {
      this.service.cree(this.createUserForm).subscribe(() => this.router.navigate(['admin', 'list']));
    }
  }
}
