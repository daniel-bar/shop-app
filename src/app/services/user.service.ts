import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpUserService } from './http/http-user.service';

import { 
  IaddProductToBagResponse,
  IEditUserDetailsResponse,
  IGetInBagProductsResponse,
} from '../models/response';

import { IUserInterface } from '../models/user.model';
import { IProductInterface } from '../models/product.model';

@Injectable()
export class UserService {
  constructor(private httpUserService: HttpUserService) {}

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
    newEmail?: string,
    newPassword?: string,
  ): Observable<IUserInterface> {
    return this.httpUserService
      .editUserDetails(password, newEmail, newPassword)
      .pipe(
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
        map((response: IEditUserDetailsResponse) => response.data!)
      );
  }

  /**
   * Handler for adding products to bag
   * @param productId products id field of products
   * @returns string Observable
   */
  public addProductToBag(
    productId: string,
  ): Observable<IUserInterface> {
    return this.httpUserService
      .addProductToBag(productId)
      .pipe(
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
        map((response: IaddProductToBagResponse) => response.data!)
      );
  }

  /**
   * Handler for getting in bag products
   * @returns string Observable
   */
  public getInBagProducts(
    id?: string,
  ): Observable<IProductInterface[]> {
    return this.httpUserService.getInBagProducts(id).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Getting in bag products failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IGetInBagProductsResponse) => response.data!)
    );
  }
}
