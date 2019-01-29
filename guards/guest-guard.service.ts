import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class GuestGuardService {
  constructor(public jwtHelper: JwtHelperService,public router: Router) {
    this.jwtHelper = new JwtHelperService();
  }
  // Token checker
   isAuthenticated(): boolean {
    //if authenticated
    let token = localStorage.getItem('token') ;
    // TOKEN DECODING REMOVE
    //token decoding and saving user ID
    return !this.jwtHelper.isTokenExpired(token);
  }
  //Token rerouter
  canActivate(): boolean {

    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false ;

    }
    if (this.isAuthenticated()) {
      return true;
    }

  }
}
