import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class RouteGuardService {

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
      //this.router.navigate(['/login']);
      return true ;
    //this.router.navigate(['/login']);
    }
    if (this.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return false;
    }

  }

}
