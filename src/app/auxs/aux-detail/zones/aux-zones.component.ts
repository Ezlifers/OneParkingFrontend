import { Component } from '@angular/core';
import { ZoneAux, AuxService, Aux } from '../../+shared/_index';

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'app-aux-zones',
    templateUrl: './aux-zones.component.html'
})
export class AuxZonesComponent {

    aux: Aux;

    constructor(private service: AuxService) {
        this.aux = service._selected;
    }

    assingZone() {
        $('ul.tabs').tabs('select_tab', 'assign');
    }




}
