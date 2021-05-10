import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { IPaymentInterface } from '../models/payment.model';
import { HttpPaymentService } from './http/http-payment.service';
import { IPaymentResponse } from '../models/response';
import { PaymentMonth, PaymentYear } from '../models/payment.model';

@Injectable()
export class PaymentService {

    constructor(
        private httpPaymentService: HttpPaymentService,
    ) { }

    /**
    * handler for checkout
    * @param save save field of checkout form
    * @param fullname fullname field of checkout form
    * @param address address field of checkout form
    * @param country country field of checkout form
    * @param city city field of checkout form
    * @param cardNumber cardNumber field of checkout form
    * @param expiryDateMonth expiryDateMonth field of checkout form
    * @param expiryDateYear expiryDateYear field of checkout form
    * @param nameOnCard nameOnCard field of checkout form
    * @param cvv cvv field of checkout form
    * @returns string Observable
    */
    public checkout(
        save: boolean,
        fullname: string,
        address: string,
        country: string,
        city: string,
        cardNumber: string,
        expiryDateMonth: PaymentMonth,
        expiryDateYear: PaymentYear,
        nameOnCard: string,
        cvv: string,
    ): Observable<IPaymentInterface> {
        return this.httpPaymentService.checkout(
            save,
            fullname,
            address,
            country,
            city,
            cardNumber,
            expiryDateMonth,
            expiryDateYear,
            nameOnCard,
            cvv,
        ).pipe(
            catchError((errorResponse: HttpErrorResponse) => {
                let errorMessage: string;
                console.log(errorResponse)

                switch (errorResponse.status) {
                    case 400:
                    case 406:
                        errorMessage = 'Checkout failed';
                        break;
                    default:
                        errorMessage = 'An error occurred';
                }

                return throwError(errorMessage);
            }),
            map((response: IPaymentResponse) => response.data!),
        );
    }
}