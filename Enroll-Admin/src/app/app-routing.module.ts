import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'new-schedule', component: NewScheduleComponent },
  { path: 'schedule-details/:id', component: ScheduleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
