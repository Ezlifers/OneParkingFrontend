import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../+core/_index';
import { HttpClientService } from '../../+shared/_index';
import { Rspn } from '../../+shared/models/rspn.model';
import { urlIncident } from '../../+shared/services/http-client.service';
import { Incident } from './_index';
import { map } from 'rxjs/operators';
import { validate } from '../../+shared/util/http-util';


@Injectable()
export class IncidentService extends HttpClientService {

    private url = '/api/incidencias';

    constructor(private http: HttpClient, session: SessionService) {
        super(session);
    }

    getIncidents(fromDate: string, toDate: string, all: boolean) {

        let q = '?';
        const sort = 'sort=fecha,desc';

        if (fromDate && fromDate !== '') {
            q += `${q}from=${fromDate}&`;
        }
        if (toDate && toDate !== '') {
            q += `to=${toDate}&`;
        }
        if (all) {
            q += 'all=true&';
        }

        return this.http.get<Rspn<Incident[]>>(this.makeUrl(urlIncident + q + sort), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    attendIncident(id: string) {
        return this.http.put<Rspn<string>>(this.makeUrl(urlIncident, id), {}, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

}
