import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpEditUserDetailsService } from './http/http-user.service';

import { IUserInterface } from '../models/user.model';
import { IEditUserDetailsResponse } from '../models/response';

@Injectable()
export class EditUserDetailsService {

    constructor(
        private httpEditUserDetailsService: HttpEditUserDetailsService,
    ) { }

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
    ): Observable<IUserInterface> {
        return this.httpEditUserDetailsService.editUserDetails(
            password,
            newEmail,
            newPassword,
            newPasswordRepeat,
        ).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                let errorMessage: string;

                switch (errorResponse.status) {
                    case 400:
                        errorMessage = 'Editing user details failed';
                        break;
                    default:
                        errorMessage = 'An error occurred';
                }

                return throwError(errorMessage);
            }),
            map((response: IEditUserDetailsResponse) => response.data!),
        );
    }

}