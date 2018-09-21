import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from '../../+shared/_index';
import { ROLES } from '../../app.settings';
import { SessionService, User } from '../_index';
import { Rspn } from '../../+shared/models/rspn.model';

@Injectable()
export class LoginService extends HttpClientService {

    constructor(private http: HttpClient, session: SessionService) {
        super(session);
    }

    public login(usr: string, pass: string): Observable<Rspn<{ token: string, user: User }>> {
        const body = { user: usr, password: pass, roles: ROLES };
        return this.http.post<Rspn<{ token: string, user: User }>>(this.makeUrl('auth', 'login'), body).pipe(
            tap(x => {
                if (x.success) {
                    const u = x.data.user;
                    this.session.id = u._id;
                    this.session.logged = true;
                    this.session.token = x.data.token;
                    this.session.type = x.data.user.tipo;
                    this.session.user = {
                        _id: u._id, cedula: u.cedula,
                        imagen: u.imagen, nombre: u.nombre,
                        celular: u.celular, tipo: u.tipo
                    };
                }
            })
        );


    }

}
