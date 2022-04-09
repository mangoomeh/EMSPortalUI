import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeLeavesComponent } from './employee-leaves/employee-leaves.component';
import { LeavesComponent } from './leaves/leaves.component';
import { SettingsComponent } from './settings/settings.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeComponent,
    AdminDashboardComponent,
    DepartmentComponent,
    EmployeeDetailComponent,
    EmployeeListComponent,
    EmployeeLeavesComponent,
    LeavesComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
