import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UserDetailComponent,
    UserCreationComponent,
    ListUsersComponent
  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe
  ]
})
export class AdminModule { }
