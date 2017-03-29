import { Component, Input, OnInit } from '@angular/core';
import { ZoneAux, Aux } from '../../../auxs/+shared/_index';
import { ZoneService } from '../../+shared/_index';
import { AuxService } from '../../../auxs/+shared/_index';

declare var Materialize: any;

@Component({
    selector: 'app-zone-aux',
    templateUrl: './zone-aux.component.html',
    providers: [AuxService]
})
export class ZoneAuxComponent implements OnInit {

    @Input() zone: ZoneAux;
    @Input() aux: Aux;
    @Input() index: number;

    days: boolean[];

    constructor(private service: AuxService) {
        this.days = [false, false, false, false, false, false, false];
    }

    ngOnInit() {
        this.zone.dias.forEach((d) => this.days[d] = true);
    }

    remove() {
        this.service.removeZone(this.aux._id, this.zone)
            .subscribe(
            res => this.removed(res),
            err => this.removed(false)
            );
    }

    removed(success: boolean) {
        if (!success) {
            Materialize.toast('Error al eliminar horario', 4000);
            return;
        }
        this.aux.zonas.splice(this.index, 1);
        Materialize.toast('horario eliminado', 4000);
    }

}
