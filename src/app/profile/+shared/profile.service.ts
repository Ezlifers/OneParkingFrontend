import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../../+core/_index';
import { HttpClientService } from '../../+shared/_index';
import { Observable } from 'rxjs';
import { urlUsr } from '../../+shared/services/http-client.service';
import { validate } from '../../+shared/util/http-util';
import { Rspn } from '../../+shared/models/rspn.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService extends HttpClientService {

    constructor(private http: HttpClient, sesion: SessionService) {
        super(sesion);
    }

    public updateUser(id: string, name: string, doc: string, cel: string, img: string): Observable<string> {
        const body: any = { img: false, usuario: { nombre: name, cedula: doc, celular: cel, imgMod: false } };
        if (img) {
            body.usuario.imagen = img;
            body.img = true;
        }
        return this.http.put<Rspn<string>>(this.makeUrl(urlUsr, id), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public updatePass(id: string, newPass: string): Observable<string> {
        const body = { img: false, usuario: { password: newPass } };
        return this.http.put<Rspn<string>>(this.makeUrl(urlUsr, id), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }
}
