import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../../models/user.model';

@Injectable()
export class PageGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    public canActivate(): Observable<boolean> {
        return this.authService.getUserListener().pipe(
            map((user: User | null) => {
                if (user) {
                    return true;
                }

                this.router.navigate(['/']);
                return false;
            }),
        );
    }
}