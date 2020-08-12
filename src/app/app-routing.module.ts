import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './components/home/home.component';
import { TelemetryPage } from './components/telemetry/telemetry.component';
import { ErrorPage } from './components/error/error.component';
import { RequestPage } from './components/request/request.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, data: { state:'home' } },
  { path: 'telemetry', component: TelemetryPage, data: { state:'telemetry-page' } },
  { path: 'requests', component: RequestPage, data: { state:'requests-page' } },
  { path: '**', component: ErrorPage }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
