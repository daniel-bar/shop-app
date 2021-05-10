import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { HttpProductService } from './http/http-product.service';

import { IProductInterface, ProductCategory, ProductGender } from '../models/product.model';
import { IAddProductResponse, IGetProductResponse, IGetProductsResponse } from '../models/response';

@Injectable()
export class ProductService {

  constructor(
    private httpProductService: HttpProductService,
  ) { }

  /**
  * Handler for adding product
  * @param category category field of adding product form
  * @param gender gender field of adding product form
  * @param title title field of adding product form
  * @param description description field of adding product form
  * @param price price field of adding product form
  * @param image image field of adding product form
  * @returns string Observable
  */
  public addProduct(
    category: ProductCategory,
    gender: ProductGender,
    title: string,
    description: string,
    price: number,
    image: File,
  ): Observable<IProductInterface> {
    return this.httpProductService.addProduct(
      category,
      gender,
      title,
      description,
      price,
      image,
    ).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Adding product failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
      map((response: IAddProductResponse) => response.data!),
    );
  }


  /**
  * Handler for getting product
  * @param id id field of getting product form
  * @returns string Observable
  */
  public getProduct(id: string): Observable<IProductInterface> {
    return this.httpProductService.getProduct(id)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Getting product failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
        map((response: IGetProductResponse) => response.data!),
      );
  }

  /**
  * Handler for getting products
  * @param id id field of getting products form
  * @returns string Observable
  */
  public getProducts(id: string): Observable<IProductInterface> {
    return this.httpProductService.getProducts(id)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Getting product failed';
            break;
          default:
            errorMessage = 'An error occurred';
        }

        return throwError(errorMessage);
      }),
        map((response: IGetProductsResponse) => response.data!),
      );
  }

  /**
  * Handler for deleting product
  * @param id id field of deleting product form
  * @returns string Observable
  */
  public deleteProduct(id: string): Observable<null> {
    return this.httpProductService.deleteProduct(id)
      .pipe(catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage: string;

        switch (errorResponse.status) {
          case 400:
            errorMessage = 'Deleting product failed';
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
