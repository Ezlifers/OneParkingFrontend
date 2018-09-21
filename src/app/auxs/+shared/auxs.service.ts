import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../+core/_index';
import { HttpClientService } from '../../+shared/_index';
import { ZoneAux, Aux, ScheduleAux } from './auxs.model';
import { Zone } from '../../zones/+shared/_index';
import { Observable, of } from 'rxjs';
import { Rspn } from '../../+shared/models/rspn.model';
import { validate } from '../../+shared/util/http-util';
import { map, tap } from 'rxjs/operators';
import { urlUsr, urlAux, urlAuth, urlZone } from '../../+shared/services/http-client.service';

@Injectable()
export class AuxService extends HttpClientService {

    _selected: Aux;

    constructor(private http: HttpClient, sesion: SessionService) {
        super(sesion);
    }

    public insertAux(aux: Aux): Observable<string> {
        aux.zonas = [];
        aux.tipo = 'Auxiliar';
        aux.version = 0;
        return this.http.post<Rspn<string>>(this.makeUrl(urlUsr), aux, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public getAuxs(): Observable<Aux[]> {
        return this.http.get<Rspn<Aux[]>>(this.makeUrl(urlAux), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public updateAux(id: string, name: string, cc: string, cel: string, dev: string, img: string): Observable<string> {

        const body: any = { img: false, usuario: { nombre: name, cedula: cc, celular: cel, dispositivo: dev } };
        if (img) {
            body.usuario.imagen = img;
            body.img = true;
        }
        return this.http.put<Rspn<string>>(this.makeUrl(urlAux, id), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public deleteAux(id: string): Observable<string> {
        return this.http.delete<Rspn<string>>(this.makeUrl(urlAux, id), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public addZone(id: string, zone: ZoneAux): Observable<string> {
        return this.http.post<Rspn<string>>(this.makeUrl(urlAux, id, 'zonas'), zone, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public getZones(id: string): Observable<ZoneAux[]> {
        return this.http.get<Rspn<ZoneAux[]>>(this.makeUrl(urlAux, id, 'zonas'), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public removeSchedule(id: string, idZone: string, schedule: ScheduleAux): Observable<string> {
        const body = { dias: schedule.dias, id: idZone, ti: schedule.ti, tf: schedule.tf };
        return this.http.put<Rspn<string>>(this.makeUrl(urlAux, id, 'horarios'), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public removeZone(id: string, idZone: string): Observable<string> {
        const body = { id: idZone };
        return this.http.put<Rspn<string>>(this.makeUrl(urlAux, id, 'zonas'), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public resetPass(id: string, temporaryPass: string) {
        const body = { password: temporaryPass };
        return this.http.put<Rspn<string>>(this.makeUrl(urlAuth, id, 'reset'), body, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public searchZones(q?: string): Observable<Zone[]> {
        let queryText = '';
        if (q) { queryText = `&q=${encodeURI(q)}`; }
        return this.http.get<Rspn<Zone[]>>(this.makeUrl(urlZone + '?times=all&sort=nombre', queryText), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public byId(id: string): Observable<Aux> {
        return this.http.get<Rspn<Aux>>(this.makeUrl(urlUsr, id)).pipe(
            map(x => validate(x)),
            tap(x => this._selected = x)
        );
    }

    public select(aux: Aux) {
        this._selected = aux;
    }

    public selected(id: string): Observable<Aux> {
        return this._selected ? of(this._selected) : this.byId(id);
    }

}

