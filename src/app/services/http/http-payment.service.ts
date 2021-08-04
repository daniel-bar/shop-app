import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IPaymentResponse } from '../../models/response';

import { PaymentMonth, PaymentYear } from '../../models/payment.model';

const ENDPOINT = environment.apiUrl + '/payment/';

@Injectable()
export class HttpPaymentService {
  constructor(private http: HttpClient) {}

  /**
   * Http handler for checkout
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
   * @returns IPaymentResponse Observable
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
    cvv: string
  ): Observable<IPaymentResponse> {
    const baseUrl = ENDPOINT + 'checkout/new';

    return this.http.post<IPaymentResponse>(baseUrl, {
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
    });
  }
}
