import { StorageService } from '../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let LocalUser = this.storage.getLocalUser();
        //Se a req tá sendo feita pra api, insere o cabeçalho, comparando o começo da url
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if (LocalUser && requestToAPI) {
            //Clona a requisição acrescentando o header + token.
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + LocalUser.token) });
            return next.handle(authReq);
       }
       else{
            return next.handle(req);
       }
    }

}
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};

