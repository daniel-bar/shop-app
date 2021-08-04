import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

import { ProductService } from '../product.service';

import { ISelectDataItem } from '../../models/shared/select-data';

@Injectable()
export class AddProductResolver implements Resolve<{
    categories: ISelectDataItem[],
    genders: ISelectDataItem[]
}> {
    constructor(private productService: ProductService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<
        {
            categories: ISelectDataItem[],
            genders: ISelectDataItem[]
        }
    > {
        return forkJoin({
            categories: this.productService.getCategories(),
            genders: this.productService.getGenders(),
        });
    }
}