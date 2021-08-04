import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
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
        .login(this.form.get('email')!.value, this.form.get('password')!.value)
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
