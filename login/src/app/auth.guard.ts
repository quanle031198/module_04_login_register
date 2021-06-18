// import { Injectable } from '@angular/core';
// import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot,  } from '@angular/router';

// @Injectable({providedIn: 'root'})

// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   token: any;
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     this.token = localStorage.getItem('token');
//     if (this.token) {
//       return true ;
//     } else {
//       this.router.navigate(['login']);
//     }
//   }
// }
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

// import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
    // private authenticationService: AuthenticationService
  )
  {}
  token: any;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = localStorage.getItem('token');
    if(this.token){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
    // const user = this.authenticationService.userValue;
    // if (user) {
    //     // check if route is restricted by role
    //     if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
    //         // role not authorised so redirect to home page
    //         this.router.navigate(['/']);
    //         return false;
    //     }

    //     // authorised so return true
    //     return true;
    // }

    // not logged in so redirect to login page with the return url

  }
}
