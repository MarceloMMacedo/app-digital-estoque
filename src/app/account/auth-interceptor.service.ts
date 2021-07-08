import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AccountService } from './account.service'; 
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    public storage: StorageService,
    public accountService: AccountService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    ////console.log(req);

    let localUser = this.storage.getLocalUser();

    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

    if (localUser && requestToAPI) {
        const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
        return next.handle(authReq);
    }
    else {
      ////console.log(req);
        return next.handle(req);
    }
}}
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

 
 
