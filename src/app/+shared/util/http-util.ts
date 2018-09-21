import { from, Observable } from 'rxjs';
import { Rspn } from '../models/rspn.model';

export function validate<T>(rspn: Rspn<T>): T {
    if (rspn.success) {
        return rspn.data;
    } else {
        throw new Error(errorMessage(rspn.error));
    }
}

function errorMessage(error: number): string {
    switch (error) {
        case 1: return 'Usuario o contraseña erroneos';
        case 2: return 'El usuario ya existe en el sistema';
        case 3: return 'Alcanzo el numero maximo de vehiculos';
        case 4: return 'No encontrado';
        case 5: return 'No se encuentra disponible';
        case 6: return 'No tiene el saldo suficiente';
        case 7: return 'No tiene tiempo disponible';
    }
}
