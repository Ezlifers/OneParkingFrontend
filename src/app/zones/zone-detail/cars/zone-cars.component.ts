import { Component, Input, OnInit } from '@angular/core';
import { ZoneCarComponent } from './zone-car.component';
import { Bay, Car, Reserve, ZoneService } from '../../+shared/_index';

declare var Materialize: any;

@Component({
    selector: 'app-zone-cars',
    templateUrl: './zone-cars.component.html'
})
export class ZoneCarsComponent implements OnInit {

    @Input() extraTime: number;
    @Input() bays: Bay[];
    @Input() id: string;
    cars: Car[];
    times: number[];
    loading: boolean;

    constructor(private service: ZoneService) { }

    ngOnInit() {
        this.loadCar();
    }

    loadCar() {
        this.times = [];
        this.cars = [];
        this.bays.forEach(b => {
            const reserve: Reserve = b.reserva;
            if (reserve && !reserve.suspendida) {
                const date = new Date(reserve.fecha);
                const time = (date.getTime() / 1000) + reserve.tiempo;
                const current = Date.now() / 1000;
                if (current < (time + this.extraTime)) {
                    this.cars.push(reserve.vehiculo);
                    this.times.push(time);
                }
            }
        });
    }

    remove(index) {
        this.cars.splice(index, 1);
    }

    refresh() {
        this.loading = true;
        this.service.getBays(this.id)
            .subscribe(res => this.reload(true, res), err => this.reload(false, null));
    }

    reload(success: boolean, bays: Bay[]) {
        this.loading = false;
        if (!success) {
            Materialize.toast('Error al cargar vehiculos', 4000);
            return;
        }
        this.bays = bays;
        this.loadCar();
    }
}
