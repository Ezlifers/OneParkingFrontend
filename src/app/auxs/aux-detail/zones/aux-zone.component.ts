import { Component, Input, OnInit } from '@angular/core';
import { ZoneAux, AuxSelectedService, AuxService } from '../../+shared/_index';

declare var Materialize: any;

@Component({
    selector: 'app-aux-zone',
    templateUrl: './aux-zone.component.html'
})
export class AuxZoneComponent implements OnInit {

    @Input() zone: ZoneAux;
    @Input() index: number;

    days: boolean[];

    constructor(private selected: AuxSelectedService, private service: AuxService) {
        this.days = [false, false, false, false, false, false, false];
    }

    ngOnInit() {
        this.zone.dias.forEach((d) => this.days[d] = true);
    }

    remove() {
        this.service.removeZone(this.selected.aux._id, this.zone)
            .subscribe(
            res => this.removed(res),
            err => this.removed(false)
            );
    }

    removed(success: boolean) {
        if (!success) {
            Materialize.toast('Error al eliminar zona', 4000);
            return;
        }
        this.selected.aux.zonas.splice(this.index, 1);
        Materialize.toast('Zona eliminada', 4000);
    }

}
