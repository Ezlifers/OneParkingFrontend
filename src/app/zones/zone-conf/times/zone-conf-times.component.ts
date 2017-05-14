import { Component, Input, OnInit } from '@angular/core';
import { Zone, ZoneService, Config } from '../../+shared/_index';
import { Config as DefaultConfig } from '../../../config/+shared/_index';
import { ZoneConfService } from '../zone-conf.service';

declare var Materialize: any;

@Component({
    selector: 'app-zone-tc',
    templateUrl: './zone-conf-times.component.html'
})
export class ZoneConfTimesComponent implements OnInit {

    @Input() zone: Zone;

    dMin: boolean;
    tMin: number;

    dMax: boolean;
    tMax: number;

    conf: Config;
    defaultConf: DefaultConfig;
    loading: boolean;

    constructor(private configService: ZoneConfService, private service: ZoneService) {
        this.defaultConf = configService.config;
        this.loading = false;
    }

    ngOnInit() {
        this.conf = this.zone.configuracion;
        this.setupTimes();
    }

    setupTimes() {
        this.dMax = this.conf.defaultTiempoMax;
        this.dMin = this.conf.defaultTiempoMin;
        this.tMax = this.conf.tiempoMax / 60;
        this.tMin = this.conf.tiempoMin / 60;
    }

    restore() {
        this.setupTimes();
    }

    changeMax(checked: boolean) {
        this.dMax = checked;
        if (checked) {
            this.tMax = this.defaultConf.tiempoMax / 60;
        } else {
            this.tMax = this.conf.tiempoMax / 60;
        }
    }

    changeMin(checked: boolean) {
        this.dMin = checked;
        if (checked) {
            this.tMin = this.defaultConf.tiempoMin / 60;
        } else {
            this.tMin = this.conf.tiempoMin / 60;
        }
    }

    save() {
        this.loading = true;
        const valueMin = this.tMin * 60;
        const valueMax = this.tMax * 60;
        this.service.updateTimes(this.zone._id, valueMax, this.dMax, valueMin, this.dMin)
            .subscribe(res => this.success()
            , err => {
                this.loading = false;
                Materialize.toast('Error al actualizar los tiempos', 4000)
            });
    }

    success() {
        this.loading = false;
        this.conf.defaultTiempoMax = this.dMax;
        this.conf.tiempoMax = (this.tMax * 60);
        this.conf.defaultTiempoMin = this.dMin;
        this.conf.tiempoMin = (this.tMin * 60);
        Materialize.toast('Tiempos actualizados', 4000);
    }

}
