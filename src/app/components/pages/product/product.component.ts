import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/services/user.service';

import { IProductInterface, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _product!: Product;

  imageSrc = '';
  productObject = '';
  product!: {
    title: string;
    description: string;
    price: number;
    image: File;
  }

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(
      this.route.data.subscribe((data: Data) => {
        this._product = new Product(data['product'] as IProductInterface);
      }),
    );
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

   /**
   * Handler for adding products to bag
   * @param productId the products id of the products
   * @returns void
   */
  public addProductToBag(productId: string) {
    this.userService.addProductToBag(productId).subscribe();
  }

  public getProduct() {
    return this._product;
  }

  public trackByFunction(index: number, item: any): null | number {
    if (!item) {
      return null;
    }
    return index;
  }

  public onClick(productObject: any) {
    this.imageSrc = productObject.src;
  }
}