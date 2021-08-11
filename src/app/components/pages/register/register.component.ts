import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(26),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  ngOnDestroy() {
    for (const subscription of this._subscriptions) {
      subscription.unsubscribe();
    }
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
      this.authService
        .register(
          this.form.get('fullname')!.value,
          this.form.get('email')!.value,
          this.form.get('password')!.value
        )
        .subscribe(
          (user) => {
            this.authService.setAuthenticatedUser(user, true);
            this.router.navigate(['/']);
          },
          (error: string) => {
            alert(error);
          }
        ),
    ];
  }
}
