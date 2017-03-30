import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SupervisorService, Supervisor, SupervisorSelectedService } from '../+shared/_index';

declare var Materialize: any;
declare var $: any;

@Component({
    templateUrl: './supervisor-detail.component.html'
})
export class SupervisorDetailComponent implements OnInit {

    desEditing = false;

    constructor(private router: Router, private route: ActivatedRoute, private selected: SupervisorSelectedService) { }

    ngOnInit() {
        setTimeout(() => $('ul.tabs').tabs(), 40);
    }

}
