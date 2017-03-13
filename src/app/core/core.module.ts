import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { NavComponent } from './dashboard/nav-aside/nav.component';

import { SessionService } from './session.service';
//import { DashboardService } from './dashboard/dashboard.service';

@NgModule({
    declarations: [
        LoginComponent,
       // DashboardComponent,
       // NavComponent,
        NotFoundComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: [SessionService
    //, DashboardService
    ]
})

@NgModule({

})
export class CoreModule { }
