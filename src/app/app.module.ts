import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';

import { CoreModule } from './+core/core.module';
import { ZonesModule } from './zones/zones.module';
import { AuxsModule } from './auxs/auxs.module';
import { SupervisorsModule } from './supervisors/supervisors.module';
import { IncidentsModule } from './incidents/incidents.module';
import { ConfigModule } from './config/config.module';
import { ProfileModule } from './profile/profile.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ZonesModule,
    AuxsModule,
    SupervisorsModule,
    IncidentsModule,
    ProfileModule,
    ConfigModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
