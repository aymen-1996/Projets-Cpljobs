import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';





@Injectable({ providedIn: 'root' })
export class AuthGuard {
constructor(
private router: Router,
private authenticationService: AuthenticationService
) { }

canActivate( state: RouterStateSnapshot) {
const currentUser = this.authenticationService.currentUserValue;
if (currentUser) {

return true;
}

this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
return false;
}
}
