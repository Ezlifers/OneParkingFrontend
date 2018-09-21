import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    set user(value: User) {
        sessionStorage.setItem('user', JSON.stringify(value));
    }

    get user(): User {
        return JSON.parse(sessionStorage.getItem('type'));
    }

    set type(value: string) {
        sessionStorage.setItem('type', value);
    }
    get type(): string {
        return sessionStorage.getItem('type');
    }

    set token(value: string) {
        sessionStorage.setItem('token', value);
    }
    get token(): string {
        return sessionStorage.getItem('token');
    }

    set logged(value: boolean) {
        sessionStorage.setItem('logged', '' + value);
    }
    get logged(): boolean {
        return sessionStorage.getItem('logged') === 'true';
    }

    set id(value: string) {
        sessionStorage.setItem('id', value);
    }
    get id(): string {
        return sessionStorage.getItem('id');
    }

    reset() {
        this.user = null;
        this.type = null;
        this.token = null;
        this.logged = false;
        this.id = null;
    }
}

export interface User {
    _id: string;
    tipo: string;
    nombre: string;
    cedula: string;
    celular: string;
    imagen: string;
}
