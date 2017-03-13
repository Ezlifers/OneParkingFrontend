import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SessionService, User } from '../_index';
import { HttpClientService } from '../../shared/_index';
import { SECRET, ROLES } from '../../app.settings';

declare var CryptoJS: any;

@Injectable()
export class LoginService extends HttpClientService {

    private url = '/apix/usuarios/login';

    constructor(http: Http, session: SessionService) {
        super(http, session);
    }

    public login(usr: string, pass: string): Observable<[boolean, any, string]> {
        const password = CryptoJS.AES.encrypt(pass, SECRET);
        const body = { user: usr, password: password, roles: ROLES, timestamp: Date.now() };
        return this.post(this.url, body, false)
            .map(this.processLogin)
            .catch(this.handleError);
    }

    private processLogin(res: Response) {
        const body = res.json();
        if (body.success) {
            return [true, body.usuario, body.token];
        } else {
            return [false, null, null];
        }
    }

    private encryptPass(usr: string, pass: string): string {
        let auth = usr + '_&&_' + pass + '_&&_' + Date.now();
        auth = CryptoJS.AES.encrypt(auth, SECRET);
        return auth;
    }
}
