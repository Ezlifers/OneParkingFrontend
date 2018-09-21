import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Incident, IncidentService } from '../+shared/_index';
import { finalize } from 'rxjs/operators';

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'app-incident',
    templateUrl: './incident.component.html'
})
export class IncidentComponent implements OnInit {

    @Input() incident: Incident;
    @Input() index: number;
    @Output() attended: EventEmitter<number> = new EventEmitter<number>();

    inZoom: boolean;

    dateNotify: number;
    dateAttend: number;

    loading: boolean;

    constructor(private service: IncidentService) { }

    ngOnInit() {
        $('.materialboxed').materialbox();
        this.inZoom = false;
        this.dateNotify = Date.parse(`${this.incident.fecha}`);
        this.dateAttend = this.incident.atendida ? Date.parse(`${this.incident.fechaAtencion}`) : null;
    }

    zoom() {
        this.inZoom = !this.inZoom;
    }

    attend() {
        this.loading = true;
        this.service.attendIncident(this.incident._id).pipe(
            finalize(() => this.loading = false)
        ).subscribe(
            () => this.attended.emit(this.index), () => Materialize.toast('Error al atender incidencia', 4000)
        );
    }

}
