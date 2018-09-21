import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User, SessionService } from '../../+core/_index';
import { ProfileService } from '../+shared/profile.service';
import { finalize } from 'rxjs/operators';

declare var Materialize: any;

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {

    @Output() finish = new EventEmitter<void>();

    loading: boolean;
    loadingPass: boolean;

    name: string;
    document: string;
    celNumber: string;

    newPass: string;

    image: File = null;
    reader: FileReader;

    constructor(private service: ProfileService, private session: SessionService) {
        this.reader = new FileReader();
        this.reader.onload = this.loadedImg(this);
    }

    ngOnInit() {
        this.name = this.session.user.nombre;
        this.document = this.session.user.cedula;
        this.celNumber = this.session.user.celular;

        this.image = null;
        this.newPass = '';
    }

    fileSelected(input: any) {
        this.image = input.target.files[0];
    }

    edit() {
        if (this.image) {
            this.reader.readAsDataURL(this.image);
        } else {
            this.editProfile(null);
        }
    }

    editProfile(img: string) {
        this.loading = true;
        this.service.updateUser(this.session.id, this.name, this.document, this.celNumber, img).pipe(
            finalize(() => this.loading = false)
        ).subscribe(
            () => {
                this.session.user.nombre = this.name;
                this.session.user.cedula = this.document;
                this.session.user.celular = this.celNumber;
                Materialize.toast('Usuario actualizado', 4000);
                this.finish.emit(null);
            },
            () => Materialize.toast('Error al editar usuario', 4000)
        );
    }

    loadedImg(profileEdit: ProfileEditComponent) {
        return function (e: any) {
            const image: string = e.target.result;
            const base: string[] = image.split(',');

            profileEdit.editProfile(base[1]);
        };
    }

    edited() {

    }

    resetPass() {
        this.loadingPass = true;
        this.service.updatePass(this.session.id, this.newPass).pipe(
            finalize(() => this.loadingPass = false)
        ).subscribe(
            () => {
                Materialize.toast('Contraseña reiniciada ', 4000);
                this.finish.emit(null);
            },
            () => Materialize.toast('Error al reiniciar password', 4000)
        );
    }

}
