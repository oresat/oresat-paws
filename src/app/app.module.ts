import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './components/home/home.component';
import { Menu } from './components/menu/menu.component';
import { TelemetryPage } from './components/telemetry/telemetry.component';
import { ErrorPage } from './components/error/error.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TelemetryTable } from './components/telemetry-table/telemetry-table.component';
import { RequestPage } from './components/request/request.component';
import { RegistrationModel } from './components/registration-model/registration-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertQueue } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    Menu,
    TelemetryPage,
    ErrorPage,
    TelemetryTable,
    RequestPage,
    RegistrationModel,
    AlertQueue
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
