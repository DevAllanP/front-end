import { AfterViewChecked, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';
import { AuthService } from '../../auth.service';
import { LibraryConfig } from '../../models/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService,
    @Inject('config') private config: LibraryConfig
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    document.getElementById("form_login_email")?.focus();
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user = this.loginForm.value;
    this.authService
      .login(user)
      .pipe(first())
      .subscribe({
        next: (u) => {
          if (u.roleLabel === 'ROLE_ADMIN')
            this.router.navigate(['/admin']);
          else if (u.roleLabel === 'ROLE_COMMERCIAL')
            this.router.navigate(['/commercial']);
          else
            this.navigationService.back();
        },
        error: (error) => {
          this.error = error;
        },
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control!.touched && control!.invalid;
  }
}
