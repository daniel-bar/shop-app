import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { ProductCategory, ProductGender } from '../../../models/product.model';

import { mimeType } from './mime-type.validator';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  public form!: FormGroup;
  public imagePreview!: string;
  private _formSubmitFailed: boolean = false;

  public categoryOptions: ProductCategory[] = [
    ProductCategory.Jeans,
    ProductCategory.Jackets,
    ProductCategory.Coats,
    ProductCategory.TShirts,
    ProductCategory.Sneakers,
    ProductCategory.Hats,
  ];
  public genderOptions: ProductGender[] = [ProductGender.Men, ProductGender.Women];


  constructor(
    public productService: ProductService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'category': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'title': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      'description': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(350)]),
      'price': new FormControl(null, Validators.required),
      'image': new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  public onOptionSelected(index: number): void {
    this.form.patchValue({
      'category': this.categoryOptions[index],
      'gender': this.genderOptions[index],
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

    this.productService.addProduct(
      this.form.get('category')!.value,
      this.form.get('gender')!.value,
      this.form.get('title')!.value,
      this.form.get('description')!.value,
      this.form.get('price')!.value,
      this.form.get('image')!.value,
    ).subscribe(
      () => {
        alert('Message has been sent!');
      },
      (error: string) => {
        console.log(error)
        alert(error);
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}