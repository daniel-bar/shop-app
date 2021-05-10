import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IAuthResponse } from '../../models/response';

const ENDPOINT = environment.apiUrl + '/auth/';

@Injectable()
export class HttpAuthService {
    constructor(
        private http: HttpClient,
    ) { }

    /**
    * Http handler for registration
    * @param fullname fullname field of registration form
    * @param email email field of registration form
    * @param passowrd password field of registration form
    * @returns IAuthResponse Observable
    */
    public register(fullname: string, email: string, password: string): Observable<IAuthResponse> {
        const baseUrl = ENDPOINT + 'register';

        return this.http.post<IAuthResponse>(baseUrl, { fullname, email, password });
    }

    /**
    * Http handler for login
    * @param email email field of login form
    * @param passowrd password field of login form
    * @returns IAuthResponse Observable
    */
    public login(email: string, password: string): Observable<IAuthResponse> {
        const baseUrl = ENDPOINT + 'login';

        return this.http.post<IAuthResponse>(baseUrl, { email, password });
    }

    /**
    * Http handler for auto login
    * @returns IAuthResponse observable
    */
    public autoLogin(): Observable<IAuthResponse> {
        const baseUrl = ENDPOINT;

        return this.http.get<IAuthResponse>(baseUrl);
    }
}