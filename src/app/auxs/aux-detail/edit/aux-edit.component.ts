import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Aux, AuxService } from '../../+shared/_index';
import { finalize } from 'rxjs/operators';

declare var Materialize: any;

@Component({
    selector: 'app-aux-edit',
    templateUrl: './aux-edit.component.html'
})
export class AuxEditComponent implements OnInit {

    @Output() finish = new EventEmitter<void>();

    loading: boolean;
    loadingPass: boolean;

    name: string;
    document: string;
    celNumber: string;
    device: string;
    tempPass: string;

    image: File = null;
    reader: FileReader;

    constructor(private service: AuxService) {
        this.reader = new FileReader();
        this.reader.onload = this.loadedImg(this);
    }

    ngOnInit() {
        this.name = this.service._selected.nombre;
        this.document = this.service._selected.cedula;
        this.celNumber = this.service._selected.celular;
        this.device = this.service._selected.dispositivo;
        this.image = null;
        this.tempPass = '';
    }

    fileSelected(input: any) {
        this.image = input.target.files[0];
    }

    edit() {
        this.loading = true;
        if (this.image) {
            this.reader.readAsDataURL(this.image);
        } else {
            this.service.updateAux(this.service._selected._id, this.name, this.document, this.celNumber, this.device, null).pipe(
                finalize(() => this.loading = false)
            ).subscribe(
                res => this.edited(),
                () => Materialize.toast('Error al editar auxiliar', 4000)
            );
        }
    }

    loadedImg(auxEdit: AuxEditComponent) {
        return function (e: any) {
            const image: string = e.target.result;
            const base: string[] = image.split(',');

            auxEdit.service.updateAux(auxEdit.service._selected._id
                , auxEdit.name, auxEdit.document, auxEdit.celNumber, auxEdit.device, base[1]
            ).subscribe(
                res => this.edited(),
                () => Materialize.toast('Error al editar auxiliar', 4000)
            );
        };
    }

    edited() {
        this.service._selected.nombre = this.name;
        this.service._selected.cedula = this.document;
        this.service._selected.dispositivo = this.device;
        this.service._selected.celular = this.celNumber;
        Materialize.toast('Auxiliar actualizado', 4000);
        this.finish.emit(null);
    }

    resetPass() {
        this.loadingPass = true;
        this.service.resetPass(this.service._selected._id, this.tempPass).pipe(
            finalize(() => this.loadingPass = false)
        ).subscribe(
            () => this.resetedPass(),
            () => Materialize.toast('Error al reiniciar password', 4000)
        );
    }

    resetedPass() {
        Materialize.toast('Contraseña reiniciada', 4000);
        this.finish.emit(null);
    }

}
