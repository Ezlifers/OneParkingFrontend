import { Component, OnInit } from '@angular/core';
import { AuxService, AuxSelectedService, ZoneAux } from '../../+shared/_index';
import { Zone } from '../../../zones/+shared/_index';

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'app-aux-assign',
    templateUrl: './aux-assign.component.html'
})
export class AuxAssignComponent implements OnInit {

    searched: boolean;
    loading: boolean;
    zones: Zone[];
    zoneA: ZoneAux;

    day: number;
    days: boolean[];
    shedule: number;
    zone: Zone;
    timeFrom: number;
    timeTo: number;
    timeMsg: string;

    constructor(private service: AuxService, private selected: AuxSelectedService) {
        this.searched = false;
        this.loading = false;
        this.zones = [];
    }

    ngOnInit() {
        $('.modal').modal();
    }

    search(q: string) {
        this.loading = true;
        this.searched = true;
        this.service.searchZones(q)
            .subscribe(
            res => this.searchEnd(res),
            err => this.searchEnd([])
            );
    }

    searchEnd(data: Zone[]) {
        this.zones = data;
        this.loading = false;
    }

    keyUp(e: any, q: string) {
        if (e.keyCode === 13) {
            this.search(q);
        }
    }

    assignDialog(zone: Zone, day: number, shedule: number) {
        if (day === 0) {
            this.days = [true, true, true, true, true];
            this.day = 5;
            setTimeout(() => this.day = 0, 20);
        }
        this.day = day;
        this.shedule = shedule;
        this.zone = zone;
        this.timeFrom = zone.configuracion.tiempos[day].horarios[shedule].ti;
        this.timeTo = zone.configuracion.tiempos[day].horarios[shedule].tf;
        switch (day) {
            case 0: this.timeMsg = 'en los siguientes dias'; break;
            case 1: this.timeMsg = 'en el dia sabado'; break;
            case 2: this.timeMsg = 'en el dia domingo'; break;
        }
        $('#assignModal').modal('open');
    }

    setDay(checked: boolean, day: number) {
        this.days[day] = checked;
    }

    assign() {
        const times = this.zone.configuracion.tiempos[this.day].horarios[this.shedule];
        let daysAux;
        switch (this.day) {
            case 0: daysAux = this.getDays(); break;
            case 1: daysAux = [5]; break;
            case 2: daysAux = [6]; break;
        }
        this.zoneA = {
            id: this.zone._id,
            nombre: this.zone.nombre,
            direccion: this.zone.direccion,
            codigo: this.zone.codigo,
            d: times.d,
            ti: times.ti,
            tf: times.tf,
            dias: daysAux
        };

        this.service.addZone(this.selected.aux._id, this.zoneA).subscribe(
            res => this.assigned(res), err => this.assigned(false)
        );
    }

    getDays() {
        const d: number[] = [];
        this.days.forEach((b, i) => {
            if (b) { d.push(i); }
        });
        return d;
    }

    assigned(success: boolean) {
        if (!success) {
            Materialize.toast('Error al asignar horario a auxiliar', 4000);
            return;
        }
        this.selected.aux.zonas.push(this.zoneA);
        Materialize.toast('Asignación exitosa', 4000);
    }


}
