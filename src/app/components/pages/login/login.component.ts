import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _formSubmitFailed: boolean = false;

  public form!: FormGroup;

  loggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
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

    this.authService.login(
      this.form.get('email')!.value,
      this.form.get('password')!.value,
    ).subscribe(
      (user) => {
        this.authService.setAuthenticatedUser(user, true);
        this.router.navigate(['/']);
      },
      (error: string) => {
        alert(error);
      }
    );
  }
}
