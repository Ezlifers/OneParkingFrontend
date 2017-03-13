import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    public user: User;
    public type: string;
    public token: string;
    public logged: boolean;
    public id: string;

    reset() {
        this.user = null;
        this.type = '';
        this.token = '';
        this.logged = false;
        this.id = '';
    }
}

export class User {
    tipo: string;
    nombre: string;
    cedula: string;
    celular: string;
    imagen: string;
}
