import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioService: UserService,
               private router: Router,
               private tokenStorageService: TokenStorageService) {}
    /*
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(!!this.tokenStorageService.getToken()){
        return true;
      }else{
        return this.router.createUrlTree(['/home']);
      }
  }*/
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
