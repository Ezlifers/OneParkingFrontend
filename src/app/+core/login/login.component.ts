import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent {

    loginProcess = false;
    errorUnkown = false;
    errorInvalid = false;

    usuario: string;
    password: string;

    constructor(private router: Router, private service: LoginService) { }

    login() {
        this.loginProcess = true;
        this.service.login(this.usuario, this.password).pipe(
            finalize(() => this.loginProcess = false)
        ).subscribe(x => {
            if (x.success) {
                this.router.navigate(['dashboard']);
            } else {
                this.errorInvalid = true;
                setTimeout(() => this.resetError(), 2000);
            }
        }, () => {
            this.errorUnkown = true;
            setTimeout(() => this.resetError(), 2000);
        });
    }

    resetError() {
        this.errorUnkown = false;
        this.errorInvalid = false;
    }

}
