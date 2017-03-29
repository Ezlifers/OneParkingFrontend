import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuxService, Aux, AuxSelectedService } from '../+shared/_index';

declare var Materialize: any;
declare var $: any;

@Component({
    templateUrl: './aux-detail.component.html'
})
export class AuxDetailComponent implements OnInit {

    desEditing = false;

    constructor(private selected: AuxSelectedService) { }

    ngOnInit() {
        setTimeout(() => $('ul.tabs').tabs(), 40);
    }

}
