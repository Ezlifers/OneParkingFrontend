import { User } from '../../+shared/models/user.model';

export interface ZoneAux {
    id: string;
    nombre: string;
    direccion: string;
    codigo: number;
    ti: number;
    tf: number;
    d: boolean;
    dias: number[];
}

export interface Aux extends User {
    dispositivo: string;
    zonas?: ZoneAux[];
}