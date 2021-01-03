import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule} from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NewScheduleComponent } from './new-schedule/new-schedule.component';
import { ScheduleOverviewComponent } from './schedule-overview/schedule-overview.component';
import { ScheduleDetailsComponent } from './schedule-details/schedule-details.component';
import { NewClassComponent } from './new-class/new-class.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ClassOverviewComponent } from './class-overview/class-overview.component';
import { StartEnrollComponent } from './start-enroll/start-enroll.component';
import { DatePipe } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { NewProfComponent } from './new-prof/new-prof.component';
import { FieldOverviewComponent } from './field-overview/field-overview.component';
import { FieldDetailsComponent } from './field-details/field-details.component';

const components = [
  AppComponent,
  LoginComponent,
  AdminPanelComponent,
  SideNavComponent,
  NewScheduleComponent,
  ScheduleOverviewComponent,
  ScheduleDetailsComponent,
  NewClassComponent,
  NewGroupComponent,
  ClassOverviewComponent,
  StartEnrollComponent,
  AddUserComponent,
  NewProfComponent,
  FieldOverviewComponent,
];

const material = [
  MatSidenavModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatDividerModule,
  MatTreeModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatDialogModule,
];

@NgModule({
  declarations: [
    components,
    FieldDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    material
  ],
  entryComponents: [
    StartEnrollComponent,
    AddUserComponent,
    ScheduleDetailsComponent,
    NewClassComponent,
    NewGroupComponent,
    NewScheduleComponent,
  ],
  providers: [DatePipe, 
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
