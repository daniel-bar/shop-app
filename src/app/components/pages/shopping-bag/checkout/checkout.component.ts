import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PaymentService } from 'src/app/services/payment.service';
import { PaymentMonth, PaymentYear } from '../../../../models/payment.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  private _onCheckoutView: boolean = false;
  private _formSubmitFailed: boolean = false;
  public form!: FormGroup;


  public monthsOptions: PaymentMonth[] = [
    PaymentMonth.January,
    PaymentMonth.February,
    PaymentMonth.March,
    PaymentMonth.April,
    PaymentMonth.May,
    PaymentMonth.June,
    PaymentMonth.July,
    PaymentMonth.August,
    PaymentMonth.September,
    PaymentMonth.October,
    PaymentMonth.November,
    PaymentMonth.December,
  ];

  public yearsOptions: PaymentYear[] = [
    PaymentYear.Y_2021,
    PaymentYear.Y_2022,
    PaymentYear.Y_2023,
    PaymentYear.Y_2024,
    PaymentYear.Y_2025,
  ];

  constructor(
    public paymentServie: PaymentService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'save': new FormControl(null, Validators.required),
      'fullname': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(26),
      ]),
      'address': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
      'cardNumber': new FormControl(null, [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(19),
      ]),
      'expiryDateMonth': new FormControl(null, Validators.required),
      'expiryDateYear': new FormControl(null, Validators.required),
      'nameOnCard': new FormControl(null, [Validators.required, Validators.maxLength(26)]),
      'cvv': new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
      ]),
    });
  }

  public onOptionSelected(index: number): void {
    this.form.patchValue({
      'expiryDateMonth': this.monthsOptions[index],
      'expiryDateYear': this.yearsOptions[index],
    });
  }

  /**
  * Getter for failure of form submit property
  * @returns boolean
  */
  public getFormSubmitFailed(): boolean {
    return this._formSubmitFailed;
  }

  /**
  * Handler for form submit
  * @returns void
  */
  public onSubmit(): void {
    if (!this.form.valid) {
      this._formSubmitFailed = true;

      return;
    }

    this._formSubmitFailed = false;

    this.paymentServie.checkout(
      this.form.get('save')!.value,
      this.form.get('fullname')!.value,
      this.form.get('address')!.value,
      this.form.get('country')!.value,
      this.form.get('city')!.value,
      this.form.get('cardNumber')!.value,
      this.form.get('expiryDateMonth')!.value,
      this.form.get('expiryDateYear')!.value,
      this.form.get('nameOnCard')!.value,
      this.form.get('cvv')!.value,
    ).subscribe(
      () => {
        alert('Checked out and saved credit card details');
      },
      (error: string) => {
        console.log(error)
        alert(error);
      });
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

