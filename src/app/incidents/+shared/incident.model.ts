export class Zone {
    id: string;
    codigo: number;
    bahia: number;
    nombre: string;

}

export class User {
    id: string;
    nombre: string;
    celular: string;
    tipo: string;
}

export class Incident {
    _id: string;
    fecha: Date;
    foto: string;
    observaciones: string;
    placa: string;
    zona: Zone;
    usuario: User;
    atendida: boolean;
    fechaAtencion: Date;
}