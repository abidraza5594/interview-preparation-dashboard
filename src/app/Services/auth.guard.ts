import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, 
    private router: Router,
    private toster:ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedInGaurd) {
      return true;
    } else {
      // Redirect to login page or any other route if not logged in
      this.toster.warning("You dont have permission login to acces this")
      this.router.navigate(['/login']);
      return false;
    }
  }
}
