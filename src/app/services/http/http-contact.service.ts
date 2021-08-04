import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
    IContactResponse,
    IGetTopicsResponse,
} from '../../models/response';

import { Topic } from '../../models/contact.model';

const ENDPOINT = environment.apiUrl + '/contact/';

@Injectable()
export class HttpContactService {
    constructor(
        private http: HttpClient,
    ) { }

    /**
    * Http handler for contact
    * @param topic topic field of contact form
    * @param message message field of contact form
    * @returns IContactResponse Observable
    */
    public contact(
        topic: Topic,
        message: string,
    ): Observable<IContactResponse> {
        const baseUrl = ENDPOINT;

        return this.http.post<IContactResponse>(baseUrl, {
            topic,
            message,
        });
    }

    /**
    * Handler for getting topics
    * @returns IGetTopicsResponse Observable
    */
    public getTopics(): Observable<IGetTopicsResponse> {
        const baseUrl = ENDPOINT + 'topics';

        return this.http.get<IGetTopicsResponse>(baseUrl);
    }
}