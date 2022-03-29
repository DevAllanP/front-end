import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/models/user.model';
import { Role } from 'src/app/models/Role.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-coordonner',
  templateUrl: './coordonner.component.html',
  styleUrls: ['./coordonner.component.css'],
})
export class CoordonnerComponent implements OnInit {
  roles!: Role[];
  currentUser!: User;
  updateUserForm: FormGroup;
  byMailForm: any;
  users: any;
  
  UtilisateurService: any;
 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private service: UtilisateurService,
    private authenticationService: AuthService,
    private modalService: ModalService
  ) {
    this.updateUserForm = this.fb.group({

      email: ['', Validators.required],
      numero: ['', Validators.required],
      rue: ['', Validators.required],
      ville: ['', Validators.required],
      codepostal: ['', Validators.required],

    });
  }
  
  send(): void {
    this.modalService.open("modal-contact");
    /*this.UtilisateurService.send(this.updateUserForm).subscribe({
      next: () => {
        const navigationExtras: NavigationExtras = {state: {data: "Veuillez vous reconnecter pour sauvegarder vos informations"}};
        this.modalService.close("modal-contact");
        this.router.navigate(['/'], navigationExtras);
      }
    });*/
  }

  ngOnInit(): void {


    
    this.authService.currentUser.subscribe({
      next: (u) => {
        this.updateUserForm.setValue({email: u.email, numero: u.adresse.numero , rue: u.adresse.rue , ville: u.adresse.ville , codepostal: u.adresse.codePostal})
        console.log(u);
        this.currentUser = u;
      },
    });
    this.authService.updateHeader();
    
    
  }

  logout() {
    this.authenticationService.logout();
  }

  isLoggedIn() {
    return this.authenticationService.isUserAuthenticated();
  }

  onSubmit(): void {
    this.service.update(this.updateUserForm).subscribe(() => this.router.navigate(['client' ,'coordonner']));
    this.logout();
    this.send();
      
    
}

}
