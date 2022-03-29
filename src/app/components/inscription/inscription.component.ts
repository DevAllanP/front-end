import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  signinForm: FormGroup;
  confirmation: boolean = true;
  erreurGlobale: string = "";

  constructor(private fb: FormBuilder, private usrService: UtilisateurService, private router: Router, private authService: AuthService) {
    this.signinForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      ddn: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
      terms: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  signin() {
    this.confirmation = this.signinForm.get("password1")?.value === this.signinForm.get("password2")?.value;
    if(this.signinForm.valid && this.confirmation) {
      this.usrService.inscrit(this.signinForm).subscribe({
        next: u => {
          this.authService.storeUser(u);
          this.router.navigate(['/']);
        },
        error: e => {
          this.erreurGlobale = e;
        }
      });
    }
  }

}
