import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './+core/not-found/not-found.component';
import { LoginComponent } from './+core/login/login.component';
import { DashboardComponent } from './+core/dashboard/dashboard.component';

import { zoneRoutes } from './zones/zones.routing';
import { auxRoutes } from './auxs/auxs.routing';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'dashboard', component: DashboardComponent, children: [
            ...zoneRoutes,
            ...auxRoutes,
            { path: '', redirectTo: 'zonas', pathMatch: 'full' }
        ]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ], exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }