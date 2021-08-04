// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// import { IUserInterface } from '../../models/user.model';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class FullnameResolver
//   implements Resolve<Pick<IUserInterface, 'fullname'>>
// {
//   constructor(private authService: AuthService) {}

//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<Pick<IUserInterface, 'fullname'>> {
//     return this.authService.getFullname();
//   }
// }
