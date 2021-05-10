import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IEditUserDetailsResponse } from 'src/app/models/response';

const ENDPOINT = environment.apiUrl + '/profile/';

@Injectable()
export class HttpEditUserDetailsService {

    constructor(private http: HttpClient) { }

    /**
    * Handler for edit user details
    * @param password password field of editing user form
    * @param newEmail new email field of editing user form
    * @param newPassword new password field of editing user form
    * @param newPasswordRepeat new password repeat field of editing user form
    * @returns string Observable
    */
    public editUserDetails(
        password: string,
        newEmail: string,
        newPassword: string,
        newPasswordRepeat: string,
    ): Observable<IEditUserDetailsResponse> {
        const baseUrl = ENDPOINT;

        return this.http.post<IEditUserDetailsResponse>(baseUrl, {
            password,
            newEmail,
            newPassword,
            newPasswordRepeat,
        });
    }
}