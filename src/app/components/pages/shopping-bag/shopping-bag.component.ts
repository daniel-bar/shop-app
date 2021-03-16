import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  private _onCheckoutView: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  /**
  * Click handler for clicking the checkout button
  * @returns void 
  */
  public onCheckoutClick(): void {
    this._onCheckoutView = true;
  }

  /**
  * Getter for on checkout view flag 
  * @returns boolean flag indicates whether client is on checkout view
  */
  public getOnCheckoutView(): boolean {
    return this._onCheckoutView;
  }
}
