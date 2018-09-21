import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../../+core/_index';
import { HttpClientService } from '../../+shared/_index';
import { Config } from './config.model';
import { Observable } from 'rxjs';
import { urlConfig } from '../../+shared/services/http-client.service';
import { Rspn } from '../../+shared/models/rspn.model';
import { map } from 'rxjs/operators';
import { validate } from '../../+shared/util/http-util';

@Injectable()
export class ConfigService extends HttpClientService {

    constructor(private http: HttpClient, sesion: SessionService) {
        super(sesion);
    }

    public getConfig(): Observable<Config> {
        return this.http.get<Rspn<Config>>(this.makeUrl(urlConfig), this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public editConfig(config: Config): Observable<string> {
        config.tiempoMax = config.tiempoMax * 60;
        config.tiempoMin = config.tiempoMin * 60;
        return this.http.put<Rspn<string>>(this.makeUrl(urlConfig), config, this.makeAuth()).pipe(
            map(x => validate(x))
        );
    }

    public resetAuxs() {
        // return this.delete(`${this.url}/auxiliares`, true).map(this.process).catch(this.handleError);
    }


}
