import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuxService, Aux } from '../+shared/_index';
import { NavigationService } from '../../+core/_index';
import { finalize } from 'rxjs/operators';


declare var Materialize: any;

@Component({
  templateUrl: './aux-list.component.html'
})
export class AuxListComponent implements AfterViewInit {

  auxs: Aux[] = [];

  constructor(private router: Router
    , private route: ActivatedRoute
    , private nav: NavigationService
    , private service: AuxService) { }

  ngAfterViewInit() {
    this.nav.loading = true;
    this.service.getAuxs().pipe(
      finalize(() => this.nav.loading = false)
    ).subscribe(x => this.auxs = x, () => Materialize.toast('Error al leer auxiliares', 4000));
  }

  goToAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  goToAux(aux: Aux) {
    this.service.select(aux);
    this.router.navigate(['./' + aux._id], { relativeTo: this.route });
  }

}
