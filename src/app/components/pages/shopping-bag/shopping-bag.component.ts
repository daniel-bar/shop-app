import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

import { IProductInterface, Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  private _subscriptions: Subscription[] = [];
  private _products: Product[] = [];
  private _productsSum!: number;
  private _noProducts: boolean = false;
  private _onCheckoutView: boolean = false;

    constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this._subscriptions.push(
      this.route.data.subscribe((data: Data) => {
        const products = data['products'] as IProductInterface[];
        
        if (products.length === 0) {
          this._noProducts = true;
          return;
        }
        
        this._noProducts = false;
    
        this._products = products.map((product) => new Product(product));

        const prices = products.map((product) => product.price);
        let sum = 0;
        for (let i = 0; i < prices.length; i++) {
            sum += prices[i];
        }
        this._productsSum = sum;
    }));
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Getter for when there are no products
   * @returns boolean
   */
  public getNoProducts() {
    return this._noProducts;
  }

  /**
   * Getter for products of the model in the DB
   * @returns products array of the model
   */
  public getProduct() {
    return this._products;
  }

  /**
   * Getter for products sum of the model in the DB
   * @returns products sum array of the model
   */
  public getProductsSum() {
    return this._productsSum;
  }

  /**
  * Click handler for clicking the checkout button
  * @returns void 
  */
  public onCheckoutClick() {
    this._onCheckoutView = true;
  }

  /**
  * Getter for on checkout view flag 
  * @returns boolean flag indicates whether client is on checkout view
  */
  public getOnCheckoutView() {
    return this._onCheckoutView;
  }
}
