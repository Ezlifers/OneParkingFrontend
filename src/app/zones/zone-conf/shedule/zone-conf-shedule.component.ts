import { Component, Input, OnInit } from '@angular/core';
import { Zone, ZoneService, TimeDescription, TimeRange, Config } from '../../+shared/_index';
import { ZoneConfService } from '../zone-conf.service';
import { Config as DefaultConfig } from '../../../config/+shared/_index';

declare var Materialize: any;
declare var $: any;

@Component({
    selector: 'app-zone-sc',
    templateUrl: './zone-conf-shedule.component.html'
})
export class ZoneConfSheduleComponent implements OnInit {

    @Input() zone: Zone;

    dTimesIni: boolean;
    dTimes: boolean;
    times: TimeRange[];

    titleDialog: string;
    addPos: number;
    addTi: string;
    addTf: string;
    addDis: boolean;

    price: number;
    pricePos: number;
    priceH: number;

    conf: Config;
    defaultConfig: DefaultConfig;

    scheduleDeleted: boolean;

    constructor(private configService: ZoneConfService, private service: ZoneService) {
        this.defaultConfig = configService.config;
    }

    ngOnInit() {
        $('.modal').modal();
        this.conf = this.zone.configuracion;
        this.dTimesIni = this.conf.defaultTiempos;
        this.dTimes = this.conf.defaultTiempos;
        this.times = this.conf.tiempos;
    }

    restore() {
        this.scheduleDeleted = false;
        this.dTimesIni = !this.conf.defaultTiempos;
        this.dTimes = this.conf.defaultTiempos;
        setTimeout(() => this.dTimesIni = !this.dTimesIni, 20);
    }

    change(checked: boolean) {
        this.dTimes = checked;
        if (this.dTimes) {
            this.times = this.defaultConfig.tiempos;
        } else if (this.dTimesIni) {
            this.times = [
                { tipo: 'Lunes-Viernes', horarios: [] }, { tipo: 'Sabado', horarios: [] }, { tipo: 'Domingo', horarios: [] }
            ];
        } else {
            this.times = this.conf.tiempos;
        }

    }

    showDialog(title: string, pos: number) {
        this.titleDialog = title;
        this.addPos = pos;
        this.addDis = true;
        this.addTi = '';
        this.addTf = '';
        $('#addDialog').modal('open');
    }

    addTime() {
        $('#addDialog').modal('close');
        const time: TimeDescription = {
            d: this.addDis,
            ti: this.convertTime(this.addTi),
            tf: this.convertTime(this.addTf),
            dp: true,
            p: this.defaultConfig.precio
        };
        this.times[this.addPos].horarios.push(time);

        this.times[this.addPos].horarios.sort((a, b) => {
            return a.ti - b.ti;
        });
    }

    convertTime(time: string) {
        const t: string[] = time.split(':');
        const h: number = parseInt(t[0], 10);
        const m: number = parseInt(t[1], 10);
        return (h * 60) + m;
    }

    changeGlobalPrice(pos: number, h: number, checked: boolean) {
        this.times[pos].horarios[h].dp = checked;
    }

    changePrice(pos: number, h: number, price: number) {
        this.price = price;
        this.priceH = h;
        this.pricePos = pos;
        $('#changePrice').modal('open');
    }

    fixPrice() {
        $('#changePrice').modal('close');
        this.times[this.pricePos].horarios[this.priceH].p = this.price;
    }

    removeTime(pos: number, h: number) {
        this.scheduleDeleted = true;
        this.times[pos].horarios.splice(h, 1);
    }

    save() {

        if (this.dTimes !== this.conf.defaultTiempos || this.scheduleDeleted) {
            $('#changeAllSchedule').modal('open');
        } else {
            this.updateSchedules();
        }
    }

    updateSchedules() {
        this.service.updateTimeShedule(this.zone._id, this.dTimes, this.times)
            .subscribe(res => this.success()
            , err => Materialize.toast('Error al actualizar el horario', 4000));
    }

    success() {
        this.conf.defaultTiempos = this.dTimes;
        this.conf.tiempos = this.times;
        Materialize.toast('Horario Actualizado', 4000);
    }


    deleteAuxs() {
        this.service.removeAllAux(this.zone._id).subscribe(res => {
            if (!res) {
                Materialize.toast('Error al actualizar el horario', 4000);
                return;
            }
            this.service.auxs = [];
            this.updateSchedules();
        }, err => Materialize.toast('Error al actualizar el horario', 4000));
    }
}
