import { Component, OnInit } from '@angular/core';
import { AuxService, ZoneAux, Aux } from '../../+shared/_index';
import { Zone } from '../../../zones/+shared/_index';
import { finalize } from 'rxjs/operators';

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

    aux: Aux;

    constructor(private service: AuxService) {
        this.searched = false;
        this.loading = false;
        this.zones = [];
        this.aux = this.service._selected;
    }

    ngOnInit() {
        $('.modal').modal();
    }

    search(q: string) {
        this.loading = true;
        this.searched = true;
        this.service.searchZones(q).pipe(
            finalize(() => this.loading = false)
        ).subscribe(x => this.zones = x);
    }

    keyUp(e: any, q: string) {
        if (e.keyCode === 13) {
            this.search(q);
        }
    }

    assignDialog(zone: Zone, day: number, shedule: number) {
        this.days = [true, true, true, true, true];
        this.day = day;
        this.shedule = shedule;
        this.zone = zone;
        this.timeFrom = zone.tiempos[day].horarios[shedule].ti;
        this.timeTo = zone.tiempos[day].horarios[shedule].tf;
        switch (day) {
            case 0: this.timeMsg = 'en los siguientes dias'; break;
            case 1: this.timeMsg = 'en el dia sabado'; break;
            case 2: this.timeMsg = 'en el dia domingo'; break;
        }
        $('#assignModal').modal('open');
    }

    assign() {
        const times = this.zone.tiempos[this.day].horarios[this.shedule];
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
            defaultTiempos: this.zone.defaultTiempos,
            horarios: [
                {
                    d: times.d,
                    ti: times.ti,
                    tf: times.tf,
                    dias: daysAux
                }
            ]

        };

        const zones = this.aux.zonas;
        let match = false;
        for (const z of zones) {
            if (z.id === this.zoneA.id) {
                const schedules = z.horarios;
                const sA = this.zoneA.horarios[0];
                for (const s of schedules) {
                    if (sA.ti === s.ti) {
                        for (const d of s.dias) {
                            for (const dA of sA.dias) {
                                if (d === dA) {
                                    match = true;
                                    break;
                                }
                            }
                            if (match) {
                                break;
                            }
                        }
                    }
                    if (match) {
                        break;
                    }
                }
            }
            if (match) {
                break;
            }
        }

        if (match) {
            Materialize.toast('Horario ya asignado o presenta un conflicto', 4000);
        } else {
            this.service.addZone(this.aux._id, this.zoneA).subscribe(
                res => this.assigned(), err => Materialize.toast('Error al asignar horario a auxiliar', 4000)
            );
        }
    }

    getDays() {
        const d: number[] = [];
        this.days.forEach((b, i) => {
            if (b) { d.push(i); }
        });
        return d;
    }

    assigned() {
        let zoneIndex = -1;
        let zoneMatch = false;
        for (const zone of this.aux.zonas) {
            zoneIndex++;
            if (this.zoneA.id === zone.id) {
                zoneMatch = true;
                break;
            }
        }
        if (!zoneMatch) {
            this.aux.zonas.push(this.zoneA);
        } else {
            this.aux.zonas[zoneIndex].horarios.push(this.zoneA.horarios[0]);
        }
        Materialize.toast('Asignación exitosa', 4000);
    }


}
