import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  private _onCheckoutView: boolean = false;

  ngOnInit() {
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
