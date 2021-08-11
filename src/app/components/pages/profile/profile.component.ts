import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private _user!: Observable<User | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this._user = this.authService.getUserListener().pipe(
      filter((user: User | null) => !!user)
    );
  }

  /**
   * Getter for fullname
   * @returns fullname string
   */
  public getFullname(): Observable<string> {
    return this._user.pipe(
      map((user: User | null) => `${user?.getFullname()}`)
    );
  }
}
