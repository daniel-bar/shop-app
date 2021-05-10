import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpContactService } from './http/http-contact.service';
import { Topic } from '../models/contact.model';

@Injectable()
export class ContactService {

    constructor(private httpContactService: HttpContactService) { }

    /**
    * handler for contact
    * @param topic topic field of contact form
    * @param message message field of contact form
    * @returns string Observable
    */
    public contact(
        topic: Topic,
        message: string,
    ): Observable<null> {
        return this.httpContactService.contact(
            topic,
            message,
        ).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                let errorMessage: string;

                switch (errorResponse.status) {
                    case 400:
                    case 406:
                        errorMessage = 'Contact failed';
                        break;
                    default:
                        errorMessage = 'An error occurred';
                }

                return throwError(errorMessage);
            }),
            map(() => null),
        );
    }
}