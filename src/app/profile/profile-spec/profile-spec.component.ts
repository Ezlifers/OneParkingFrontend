import { Component } from '@angular/core';
import { SessionService, User } from '../../+core/_index';


@Component({
    selector: 'app-profile-spec',
    templateUrl: './profile-spec.component.html'
})
export class ProfileSpecComponent {
    user: User;
    constructor(session: SessionService) {
        this.user = session.user;
    }
}
