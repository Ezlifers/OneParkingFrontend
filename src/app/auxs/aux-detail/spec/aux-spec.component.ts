import { Component, Input } from '@angular/core';
import { Aux, AuxService } from '../../+shared/_index';

@Component({
    selector: 'app-aux-spec',
    templateUrl: './aux-spec.component.html'
})
export class AuxSpecComponent {

    aux: Aux;

    constructor(private service: AuxService) {
        this.aux = this.service._selected;
    }

}
