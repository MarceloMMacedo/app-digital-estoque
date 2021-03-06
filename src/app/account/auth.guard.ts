import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: StorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      // tslint:disable-next-line: prefer-const
      let localUser = this.storage.getLocalUser();
      //console.log(localUser);

      const token = localUser.token;
      if (token != null) {
        //console.log(token);
        return true;
      } else {
        this.router.navigate(['digital']);
        console.log('aut1');
        return false;
      }
    } catch (error) {
      if (
        this.storage.getLocalUser() != null) {
         console.log('aut2');
        this.router.navigate(['digital']);
        return false;
      } else {
      console.log('aut3');
        this.router.navigate(['digital']);
        return false;
      }

    }
  }
}
