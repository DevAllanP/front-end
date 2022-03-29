import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.getLoggedUser();
		const expectedRole = route.data['expectedRole'];
		const forAnonymous: boolean = route.data['forAnonymous'] === true && !currentUser.roleLabel;
		if (forAnonymous || currentUser.roleLabel === expectedRole) {
			return true;
		}
		this.router.navigate(['']);
		return false;
	}
}
