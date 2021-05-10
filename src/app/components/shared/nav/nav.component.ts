import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  private _subscription: Subscription[] = [];
  private _isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this._subscription.push(this.authService.getUserListener().subscribe(
      (user) => {
        this._isLoggedIn = user !== null;
      },
    ));
  }

  ngOnDestroy(): void {
    for (const subscription of this._subscription) {
      subscription.unsubscribe();
    }
  }

  /**
  * Getter for logged in prperty
  * @returns boolean
  */
  public getIsLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  /**
  * Handler for logout
  * @returns void
  */
  public onLogout(): void {
    this.authService.logout();
  }
}
