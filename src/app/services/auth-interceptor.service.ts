import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (
            (req.url === environment.apiUrl + '/auth/login' && req.method === 'POST') ||
            (req.url === environment.apiUrl + '/auth/register' && req.method === 'POST')
        ) {
            return next.handle(req);
        }

        const modifiedRequest = req.clone({
            headers: req.headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('auth_token'))
        });
        return next.handle(modifiedRequest);
    }
}