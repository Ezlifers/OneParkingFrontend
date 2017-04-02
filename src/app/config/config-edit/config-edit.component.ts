import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Config, ConfigService } from '../+shared/_index';

declare var Materialize: any;

@Component({
    selector: 'app-config-edit',
    templateUrl: './config-edit.component.html'
})
export class ConfigEditComponent implements OnInit {

    @Output() finish = new EventEmitter<void>();
    @Input() config: Config;

    loading: boolean;
    newConfig: Config;

    constructor(private service: ConfigService) { }

    ngOnInit() {
        this.newConfig = {
            tiempoMin: this.config.tiempoMin / 60,
            tiempoMax: this.config.tiempoMax / 60,
            tiempoExtra: this.config.tiempoExtra / 60,
            precio: this.config.precio,
            vehiculosUsuario: this.config.vehiculosUsuario,
            tiempos: JSON.parse(JSON.stringify(this.config.tiempos))
        };
    }

    edit() {
        this.loading = true;
        this.service.editConfig(this.newConfig)
            .subscribe(
            res => this.edited(res),
            error => this.edited(false)
            );
    }

    edited(success: boolean) {
        this.loading = false;
        if (!success) {
            Materialize.toast('Error al editar las configuraciones', 4000);
            return;
        }
        this.config.tiempoMin = this.newConfig.tiempoMin;
        this.config.tiempoMax = this.newConfig.tiempoMax;
        this.config.tiempos = this.newConfig.tiempos;
        this.config.tiempoExtra = this.newConfig.tiempoExtra;
        this.config.precio = this.newConfig.precio;
        this.config.vehiculosUsuario = this.newConfig.vehiculosUsuario;
        Materialize.toast('Configuraciones actualizadas', 4000);
        this.finish.emit(null);
    }
}
