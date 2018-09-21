import { Component, Input, OnInit } from '@angular/core';
import { ScheduleAux, ZoneAux, AuxService, Aux } from '../../+shared/_index';

declare var Materialize: any;

@Component({
    selector: 'app-aux-zone',
    templateUrl: './aux-zone.component.html'
})
export class AuxZoneComponent implements OnInit {

    @Input() schedule: ScheduleAux;
    @Input() zone: ZoneAux;
    @Input() sIndex: number;
    @Input() zIndex: number;

    days: boolean[];
    aux: Aux;

    constructor(private service: AuxService) {
        this.days = [false, false, false, false, false, false, false];
        this.aux = this.service._selected;
    }

    ngOnInit() {
        this.schedule.dias.forEach((d) => this.days[d] = true);
    }

    remove() {

        (this.zone.horarios.length > 1 ? this.service.removeSchedule(this.aux._id, this.zone.id, this.schedule)
            : this.service.removeZone(this.aux._id, this.zone.id))
            .subscribe(
                res => this.removed(),
                err => Materialize.toast('Error al eliminar horario', 4000)
            );
    }

    removed() {
        if (this.zone.horarios.length > 1) {
            this.aux.zonas[this.zIndex].horarios.splice(this.sIndex, 1);
        } else {
            this.aux.zonas.splice(this.zIndex, 1);
        }
        Materialize.toast('Horario eliminado', 4000);
    }
}
