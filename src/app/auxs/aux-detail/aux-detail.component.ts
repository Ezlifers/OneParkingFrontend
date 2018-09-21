import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuxService, Aux } from '../+shared/_index';
import { mergeMap } from 'rxjs/operators';

declare var Materialize: any;
declare var $: any;

@Component({
    templateUrl: './aux-detail.component.html'
})
export class AuxDetailComponent implements OnInit {

    desEditing = false;
    aux: Aux;

    constructor(private router: Router, private route: ActivatedRoute, private service: AuxService) {
        this.route.paramMap.pipe(
            mergeMap(x => this.service.selected(x.get('id')))
        ).subscribe(x => this.aux = x, () => Materialize.toast('Error al recuperar el Auxiliar', 4000));
    }

    ngOnInit() {
        $('.modal').modal();
        setTimeout(() => $('ul.tabs').tabs(), 40);
    }

    deleteDialog() {
        $('#deleteDialog').modal('open');
    }

    deleteAux() {
        this.service.deleteAux(this.aux._id)
            .subscribe(() => {
                Materialize.toast('Auxiliar eliminado', 4000);
                this.router.navigate(['../'], { relativeTo: this.route });
            }, () => Materialize.toast('Error al eliminar el Auxiliar', 4000));
    }

}
