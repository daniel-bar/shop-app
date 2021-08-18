import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProductInterface, ProductCategory, ProductGender } from '../../models/product.model';
import { ProductService } from '../product.service';

@Injectable()
export class ProductsResolver implements Resolve<IProductInterface[]> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductInterface[]> {
    return this.productService.getProducts(
      +route.queryParamMap.get('gender')! as ProductGender,
      +route.queryParamMap.get('category')! as ProductCategory,
      );
  }
}
