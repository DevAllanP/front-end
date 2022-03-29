import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "src/app/auth/auth.module";
import { LibraryConfig } from "src/app/auth/models/config";
import { ListUsersComponent } from "./components/list-users/list-users.component";
import { UserCreationComponent } from "./components/user-creation/user-creation.component";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";

const adminroutes: Routes = [
  { path: "list", component: ListUsersComponent },
  { path: "creer", component: UserCreationComponent },
  { path: "modifier/:id", component: UserCreationComponent },
  { path: "search", component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
  static forRoot(config: LibraryConfig): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [{ provide: 'config', useValue: config }]
    };
  }
}
