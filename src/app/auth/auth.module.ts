import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from '../components/inscription/inscription.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LibraryConfig } from './models/config';


@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
  ],
  declarations: [
      LoginComponent,
      InscriptionComponent
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ]
})
export class AuthModule {
    static forRoot(config: LibraryConfig): ModuleWithProviders<AuthModule> {
        return {
          ngModule: AuthModule,
          providers: [{provide: 'config', useValue: config}]
        };
      }
}
