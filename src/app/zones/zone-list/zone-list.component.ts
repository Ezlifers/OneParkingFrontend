import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneService, Zone, MapComponent } from '../+shared/_index';
import { NavigationService } from '../../+core/_index';

declare var Materialize: any;

@Component({
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements AfterViewInit {

  zones: Zone[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private service: ZoneService, private nav: NavigationService) { }

  ngAfterViewInit() {
    this.nav.loading = true;
    this.service.getZones().subscribe(data => this.loadZones(data, false) , err => this.loadZones([], true));
  }

  loadZones(data: Zone[], error: boolean) {
    this.nav.loading = false;
    if(error){
      Materialize.toast('Error al leer zonas', 4000)
      return;
    }
    this.zones = data;
  }

  goToAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  goToZone(id: number) {
    this.router.navigate(['./', id], { relativeTo: this.route });
  }

}
