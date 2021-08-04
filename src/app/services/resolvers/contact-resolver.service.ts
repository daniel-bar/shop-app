import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactService } from '../contact.service';

import { ISelectDataItem } from '../../models/shared/select-data';

@Injectable()
export class ContactResolver implements Resolve<ISelectDataItem[]> {
    constructor(private contactService: ContactService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISelectDataItem[]> {
        return this.contactService.getTopics();
    }
}