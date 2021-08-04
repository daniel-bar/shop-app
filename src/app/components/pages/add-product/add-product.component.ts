import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { mimeType } from './mime-type.validator';

import { ISelectDataItem } from '../../../models/shared/select-data';

import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _formSubmitFailed: boolean = false;
  private _categories!: ReadonlyArray<ISelectDataItem>;
  private _genders!: ReadonlyArray<ISelectDataItem>;
  private _imagePreview: string | null = null;

  public form!: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      category: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(350),
      ]),
      price: new FormControl(null, Validators.required),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this._categories = this.route.snapshot.data['data'].categories;
    this._genders = this.route.snapshot.data['data'].genders;
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Getter for categories labels
   * @returns categories labels
   */
  public getCategoriesLabels() {
    return this._categories.map((category) => category.label);
  }

  /**
   * Getter for genders labels
   * @returns genders labels
   */
  public getGendersLabels() {
    return this._genders.map((gender) => gender.label);
  }

  /**
   * Getter for image preview value
   * @returns image preview vaule
   */
  public getImagePreview(): string | null {
    return this._imagePreview;
  }

  /**
   * Select handler for selecting category option
   * @param index the index of the selected option
   * @returns void
   */
  public onCategoryOptionSelected(index: number) {
    this.form.patchValue({
      category: this._categories[index].value,
    });
  }

  /**
   * Select handler for selecting gender option
   * @param index the index of the selected option
   * @returns void
   */
  public onGenderOptionSelected(index: number) {
    this.form.patchValue({
      gender: this._genders[index].value,
    });
  }

  /**
   * Getter for failure of form submit property
   * @returns boolean
   */
  public getFormSubmitFailed() {
    return this._formSubmitFailed;
  }

  /**
   * Handler for form submit
   * @returns void
   */
  public onSubmit() {
    if (!this.form.valid) {
      this._formSubmitFailed = true;
      return;
    }

    this._formSubmitFailed = false;

    this._subscriptions = [
      ...this._subscriptions,
      this.productService
        .addProduct(
          this.form.get('category')!.value,
          this.form.get('gender')!.value,
          this.form.get('title')!.value,
          this.form.get('description')!.value,
          this.form.get('price')!.value,
          this.form.get('image')!.value
        )
        .subscribe(
          () => {
            alert('Product added!');
            this.router.navigate(['/']);
          },
          (error: string) => {
            console.log(error);
          }
        ),
    ];
  }

  /**
   * Handler for picking an image
   * @param event the event of the picked image
   * @returns void
   */
  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this._imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
