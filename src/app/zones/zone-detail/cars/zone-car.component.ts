import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Car, ZoneService } from '../../+shared/_index';

declare var Materialize: any;
const alarmTime = 300;

@Component({
    selector: 'app-zone-car',
    templateUrl: './zone-car.component.html'
})
export class ZoneCarComponent implements OnInit, OnDestroy {

    @Input() car: Car;
    @Input() extraTime: number;
    @Input() timeComplete;
    @Input() index: number;
    @Output() finish = new EventEmitter<number>();

    extra: boolean;
    alarm: boolean;
    time: number;
    interval: NodeJS.Timer;

    constructor() {
        this.extra = false;
        this.alarm = false;
    }

    ngOnInit() {
        this.calculateTime();
        this.interval = setInterval(() => this.calculateTime(), 30000);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    calculateTime() {

        const now = Date.now() / 1000;
        let timeOut: number = this.timeComplete - now;
        if (timeOut >= 0) {
            if (timeOut <= alarmTime) {
                this.alarm = true;
            }
        } else {
            timeOut += this.extraTime;
            this.extra = true;
        }
        if (timeOut > 0) {
            this.time = parseInt(`${timeOut / 60}`, 10 ) + 1;
        } else {
            this.finish.emit(this.index);
        }

    }



}
