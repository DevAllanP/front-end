import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-suppression',
  templateUrl: './suppression.component.html',
  styleUrls: ['./suppression.component.css']
})
export class SuppressionComponent implements OnInit {
  currentUser!: User;
  updateDisableForm!: FormGroup;
  UtilisateurService: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UtilisateurService,
    private authenticationService: AuthService,
  ) { 
    this.updateDisableForm = this.fb.group({
      password : ['', Validators.required],
      disable: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  isLoggedIn() {
    return this.authenticationService.isUserAuthenticated();
  }
  logout() {
    this.authenticationService.logout();
  }

  check(): boolean {
    var oui = <HTMLInputElement>document.getElementById('oui');
    var non = <HTMLInputElement>document.getElementById('non'); 

    if (oui.checked) {
      return true;
    }else {
      alert("Si vous ne voulez pas desactivé votre compte revenz en arriere  .")
      return false;
    }
    
    

  }
  onSubmit(): void {
    if (this.check() === true) {
      this.service
        .updateDisable(this.updateDisableForm)
        .subscribe({next:() => { alert("Votre compte vas etre desactivé")
          this.router.navigate(['client', 'coordonner'])} , error:()=> alert("Si vous ne voulez pas desactivé votre compte revenz en arriere  .")}  );
          this.logout();
    
    }
    }
  }


