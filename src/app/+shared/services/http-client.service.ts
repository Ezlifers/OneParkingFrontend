import { SessionService } from '../../+core/_index';
import { environment } from '../../../environments/environment';

export const urlAux = 'auxiliares';
export const urlUsr = 'usuarios';
export const urlZone = 'zonas';
export const urlAuth = 'auth';
export const urlConfig = 'configuracion';

export abstract class HttpClientService {

    constructor(protected session: SessionService) { }

    makeUrl(...paths: any[]) {
        let url = environment.baseUrl;
        paths.forEach(x => url += `/${x}`);
        return url;
    }

    makeAuth() {
        return {
            headers: {
                'Authorization': this.session.token
            }
        };
    }

}

