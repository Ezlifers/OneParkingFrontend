import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Aux, AuxService } from '../+shared/_index';
import { finalize } from 'rxjs/operators';

declare var Materialize: any;

@Component({
    templateUrl: './aux-add.component.html'
})
export class AuxAddComponent {

    aux: Aux;
    loading = false;
    file: File = null;
    reader: FileReader;

    constructor(private router: Router, private route: ActivatedRoute, private service: AuxService) {
        this.aux = { nombre: null, cedula: null, celular: null, imagen: null, dispositivo: null };
        this.reader = new FileReader();
        this.reader.onload = this.loadedImg(this);
    }

    fileSelected(input: any) {
        this.file = input.target.files[0];
    }

    loadedImg(auxAdd: AuxAddComponent) {
        return function (e: any) {
            const image: string = e.target.result;
            const base: string[] = image.split(',');
            auxAdd.aux.imagen = base[1];
            auxAdd.addProcess();
        };
    }

    add() {
        this.aux.usuario = this.aux.cedula;
        if (this.file) {
            this.reader.readAsDataURL(this.file);
        } else {
            this.aux.imagen = null;
            this.addProcess();
        }
    }

    addProcess() {
        this.loading = true;
        this.service.insertAux(this.aux).pipe(
            finalize(() => this.loading = false)
        ).subscribe(x => {
            Materialize.toast('Operación Exitosa', 4000);
            this.router.navigate(['../'], { relativeTo: this.route });
        }, () => Materialize.toast('Error al ingresar Auxiliar', 4000));
    }
}
