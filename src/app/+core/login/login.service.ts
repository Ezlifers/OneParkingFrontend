import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../+shared/_index';
import { ROLES } from '../../app.settings';
import { SessionService, User } from '../_index';

@Injectable()
export class LoginService extends HttpClientService {

    private url = '/api/usuarios/login';

    constructor(http: Http, session: SessionService) {
        super(http, session);
    }

    public login(usr: string, pass: string): Observable<[boolean, User, any, string]> {
        const body = { user: usr, password: pass, roles: ROLES, timestamp: Date.now() };
        return this.post(this.url, body, false)
            .map(this.processLogin)
            .catch(this.handleError);
    }

    private processLogin(res: Response) {
        const body = res.json();
        if (body.success) {
            return [true, body.user, body.permissions, body.token];
        } else {
            return [false, null, null];
        }
    }

}
