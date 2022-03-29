import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changemdp',
  templateUrl: './changemdp.component.html',
  styleUrls: ['./changemdp.component.css'],
})
export class ChangemdpComponent implements OnInit {
  currentUser!: User;
  updateMdpForm!: FormGroup;
  UtilisateurService: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UtilisateurService
  ) {
    this.updateMdpForm = this.fb.group({
      password: ['', Validators.required],
      oldPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.compareMdp() === true) {
      this.service
        .updateMdp(this.updateMdpForm)
        .subscribe({next:() => { alert("Modification du mots de passe effectué")
          this.router.navigate(['client', 'coordonner'])} , error:()=> alert("Les mots de passe ne correspondent pas .")}  );
    }
  }

  compareMdp(): boolean {
    
    var password1 = <HTMLInputElement>document.getElementById('password1');
    var password2 = <HTMLInputElement>document.getElementById('password2');



    if (
      password1.value === password2.value &&
      password1.value !== '' &&
      password2.value !== ''
    ) {
      password1.style.border = 'none ';
      password1.style.borderColor = 'none ';
      password2.style.border = 'none ';
      password2.style.borderColor = 'none ';
      return true;
    } else {
      password1.style.border = '4px solid ';
      password1.style.borderColor = 'red ';
      password2.style.border = '4px solid ';
      password2.style.borderColor = 'red ';
      return false;
    }
  }
}
