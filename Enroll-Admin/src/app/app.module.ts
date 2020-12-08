import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

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
import { ClassDetailsComponent } from './class-details/class-details.component';
import { GroupOverviewComponent } from './group-overview/group-overview.component';
import { GroupDetailsComponent } from './group-details/group-details.component';

@NgModule({
  declarations: [
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
    ClassDetailsComponent,
    GroupOverviewComponent,
    GroupDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
