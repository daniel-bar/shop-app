import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, ReplaySubject } from 'rxjs';

import { User, IUserInterface } from '../models/user.model';
import { HttpAuthService } from './http/http-auth.service';
import { IAuthResponse } from '../models/response';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private _user$: ReplaySubject<User | null> = new ReplaySubject<User | null>(1);

  constructor(
    private httpUserService: HttpAuthService,
    private router: Router,
  ) {}

  /**
   * Provide a listener to authenticated user
   * @returns user event provider
   */
  public getUserListener(): Observable<User | null> {
    return this._user$.asObservable();
  }

  /**
   * Handler for registration
   * @param fullname fullname field of registration form
   * @param email email field of registration form
   * @param passowrd password field of registration form
   * @returns string Observable
   */
  public register(
    fullname: string,
    email: string,
    password: string
  ): Observable<IUserInterface> {
    return this.httpUserService.register(fullname, email, password).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
          case 406:
            errorMessage = 'Authentication failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IAuthResponse) => response.data!)
    );
  }

  /**
   * Handler for login
   * @param email email field of login form
   * @param passowrd password field of login form
   * @returns IUserInterface Observable
   */
  public login(email: string, password: string): Observable<IUserInterface> {
    return this.httpUserService.login(email, password).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
          case 406:
            errorMessage = 'Authentication failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IAuthResponse) => response.data!)
    );
  }

  /**
   * Handler for auto login
   * @returns void
   */
  public autoLogin(): void {
    if (
      !sessionStorage.getItem('auth_token') &&
      !localStorage.getItem('auth_token')
    ) {
      this._user$.next(null);
      return;
    }

    this.httpUserService.autoLogin().subscribe(
      (response: IAuthResponse) => this._user$.next(new User(response.data!)),
      () => this._user$.next(null)
    );
  }

  /**
   * Setter for authenticated user
   * @param user user data to be set
   * @param remember indicator flag to keep user authenticated
   * @returns void
   */
  public setAuthenticatedUser(user: IUserInterface, remember: boolean): void {
    this._user$.next(new User(user));

    if (remember) {
      localStorage.setItem('auth_token', user.token!);
    }

    return sessionStorage.setItem('auth_token', user.token!);
  }

  /**
   * Handler for logout
   * @returns void
   */
  public logout(): void {
    this._user$.next(null);
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/');
  }
}
