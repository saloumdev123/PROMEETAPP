
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshed$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access = this.auth.getAccessToken();
    const authReq = access ? req.clone({ setHeaders: { Authorization: `Bearer ${access}` } }) : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && this.auth.getRefreshToken()) {
          return this.handle401(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshed$.next(false);

      return this.auth.refreshAccessToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;
          this.refreshed$.next(true);
          const access = this.auth.getAccessToken();
          return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${access}` } }));
        }),
        catchError((e) => {
          this.isRefreshing = false;
          this.auth.logout();
          return throwError(() => e);
        })
      );
    } else {
      return this.refreshed$.pipe(
        filter((done) => done === true),
        take(1),
        switchMap(() => {
          const access = this.auth.getAccessToken();
          return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${access}` } }));
        })
      );
    }
  }
}
